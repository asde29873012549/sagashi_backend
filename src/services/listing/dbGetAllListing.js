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

import LZString from "lz-string";

export default async function dbGetListing(req) {
	let result;

	const { filter } = req.query;

	const filterQuery = filter ? JSON.parse(LZString.decompressFromEncodedURIComponent(filter)) : {};

	const query_template = {
		size: 5,
		query: {},
		sort: [{ updated_at: "desc" }],
	};

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

	if (validated.length === 0 || (validated.includes("cursor") && validated.length === 1)) {
		// if no filter specified or cursor is the only filter
		// get all listing
		const es_query = query_template;
		es_query.query.match_all = {};
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
			const query = filter_query(query_template, filterQuery);
			const data = await client.search(query);
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
	}

	return result;
}
