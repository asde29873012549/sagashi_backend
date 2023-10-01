import * as dotenv from "dotenv";
import { errors as EsError } from "@elastic/elasticsearch";
import client from "../../../elastic_search/client.js";
import {
	ServiceUnavailableError,
	ValidationError,
	ElasticSearchError,
} from "../../utils/api_error.js";
import hits_extractor from "../../utils/elastic_search/hits_extractor.js";

dotenv.config();

export default async function dbGetDesigners(req) {
	const querySizeLimit = 10
	const result = {
		pagination:{},
		pageData: []
	};

	const { keyword, cursor } = req.query;

	const query_template = {
		_source: ["designer_id", "name"],
		size: querySizeLimit,
		query: {},
		sort: [{ designer_id: "asc" }],
	};

	if (keyword) {
		query_template.query.match = { name: keyword }
	} else {
		query_template.query.match_all = {}
	}
	
	if (cursor) query_template.search_after = JSON.parse(decodeURI(cursor));

	const es_query = query_template;
	try {
		const data = await client.search(es_query);
		result.pageData = hits_extractor(data);
	} catch (err) {
		if (err instanceof EsError) {
			throw new ElasticSearchError(err.name);
		} else if (err instanceof ValidationError) {
			throw err;
		} else {
			throw new ServiceUnavailableError();
		}
	}

	if (result.pageData.length < querySizeLimit) result.pagination.isEnd = true

	return result;
}
