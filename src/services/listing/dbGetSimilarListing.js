import { errors as EsError } from "@elastic/elasticsearch";
import {
	ServiceUnavailableError,
	ValidationError,
	ElasticSearchError,
} from "../../utils/api_error.js";
import client from "../../../elastic_search/client.js";
import hits_extractor from "../../utils/elastic_search/hits_extractor.js";
import { getNowISODate } from "../../utils/date.js";

export default async function dbGetSimilarListing(req) {
	let result;

	const { category, subCategory, department, designer } = req.query;

	if (!category || !subCategory || !department || !designer) throw new ValidationError();

	const es_query = {
		size: 9,
		query: {
			function_score: {
				linear: {
					updated_at: {
						origin: getNowISODate(),
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
							{
								term: {
									department,
								},
							},
						],
						should: [
							{
								term: {
									category: {
										value: category,
										boost: 2,
									},
								},
							},
							{
								term: {
									subCategory: {
										value: subCategory,
										boost: 5,
									},
								},
							},
							{
								term: {
									"designer.keyword": {
										value: designer,
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

	return result.slice(1);
}
