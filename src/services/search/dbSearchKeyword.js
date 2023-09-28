import { errors as EsError } from "@elastic/elasticsearch";
import {
	ServiceUnavailableError,
	ValidationError,
	ElasticSearchError,
} from "../../utils/api_error.js";
import client from "../../../elastic_search/client.js";
import hits_extractor from "../../utils/elastic_search/hits_extractor.js";

export default async function dbSearchKeyword(req) {
	let result;

	const { limit, cursor, keyword } = req.query;

	const query_template = {
		size: limit || 20,
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
									category: keyword,
								},
							},
							{
								term: {
									subCategory: keyword,
								},
							},
							{
								term: {
									color: keyword,
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
					},
				},
			},
		},
	};

	const es_query = query_template;
	if (cursor) es_query.search_after = JSON.parse(decodeURI(cursor));

	try {
		const data = await client.search(es_query);
		result = hits_extractor(data);
	} catch (err) {
		if (err instanceof EsError) {
			throw new ElasticSearchError(err.name);
		} else if (err instanceof ValidationError) {
			throw err;
		} else {
			throw new ServiceUnavailableError();
		}
	}

	return result;
}
