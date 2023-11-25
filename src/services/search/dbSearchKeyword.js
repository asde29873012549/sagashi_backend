import * as dotenv from "dotenv";
import { errors as EsError } from "@elastic/elasticsearch";
import {
	ServiceUnavailableError,
	ValidationError,
	ElasticSearchError,
} from "../../utils/api_error.js";
import client from "../../../elastic_search/client.js";
import hits_extractor from "../../utils/elastic_search/hits_extractor.js";
import filter_query from "../../utils/elastic_search/filter_query.js";
import validator from "../../utils/elastic_search/validator.js";

dotenv.config();

const product_index = process.env.ES_PRODUCT_INDEX;

export default async function dbSearchKeyword(req) {
	let result;

	const { limit, keyword } = req.query;
	const filterQuery = req.body || {};

	const support_queries = [
		"department",
		"designers",
		"category",
		"subCategory",
		"condition",
		"newArrivals",
		"price_ceil",
		"price_ground",
		"sizes",
		"limit",
		"cursor",
	];

	// check for invalid query param
	const validated = validator(support_queries, filterQuery);

	const query_template = {
		size: limit || 20,
		index: product_index,
		query: {
			function_score: {
				linear: {
					updated_at: {
						origin: new Date().toISOString(),
						scale: "14d",
						decay: 0.95,
					},
				},
				query: {
					bool: {
						filter: [
							{
								term: {
									status: "1",
								},
							},
						],
						should: [
							{
								term: {
									department: keyword,
								},
							},
							{
								term: {
									category: {
										value: keyword,
										case_insensitive: true,
									},
								},
							},
							{
								term: {
									subCategory: {
										value: keyword,
										case_insensitive: true,
									},
								},
							},
							{
								term: {
									color: {
										value: keyword,
										case_insensitive: true,
									},
								},
							},
							{
								term: {
									"tags.keyword": keyword,
								},
							},
							{
								term: {
									"designer.keyword": keyword,
								},
							},
							{
								match: {
									"subCategory.text": {
										query: keyword,
										fuziness: 1,
										boost: 5,
									},
								},
							},
							{
								match: {
									designer: {
										query: keyword,
										boost: 10,
									},
								},
							},
							{
								match: {
									name: {
										query: keyword,
										boost: 15,
									},
								},
							},
							{
								match: {
									tags: {
										query: keyword,
										boost: 10,
									},
								},
							},
						],
						minimum_should_match: 1,
					},
				},
			},
		},
	};

	// if (cursor) es_query.search_after = JSON.parse(decodeURI(cursor));

	if (validated.length === 0 || (validated.includes("cursor") && validated.length === 1)) {
		// if no filter specified or cursor is the only filter
		// get all listing
		const es_query = query_template;

		if (validated.includes("cursor")) es_query.search_after = filterQuery.cursor;

		try {
			const data = await client.search(es_query);
			result = {
				total: data.hits.total.value,
				result: hits_extractor(data),
			};
		} catch (err) {
			if (err instanceof EsError) {
				throw new ElasticSearchError(err.name);
			} else if (err instanceof ValidationError) {
				throw err;
			} else {
				throw new ServiceUnavailableError();
			}
		}
	} else {
		try {
			const partial_query = filter_query(query_template.query.function_score, filterQuery);
			const query = {
				...query_template,
				query: {
					...query_template.query,
					function_score: {
						...query_template.query.function_score,
						query: partial_query.query,
					},
				},
			};

			const data = await client.search(query);
			result = {
				total: data.hits.total.value,
				result: hits_extractor(data),
			};
		} catch (err) {
			console.log(err, "Errr");
			if (err instanceof EsError) {
				throw new ElasticSearchError(err.name);
			} else if (err instanceof ValidationError) {
				throw err;
			} else {
				throw new ServiceUnavailableError();
			}
		}
	}

	return result;
}
