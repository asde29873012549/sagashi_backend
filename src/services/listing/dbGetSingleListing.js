import { errors as EsError } from "@elastic/elasticsearch";
import {
	ServiceUnavailableError,
	ValidationError,
	ElasticSearchError,
} from "../../utils/api_error.js";
import client from "../../../elastic_search/client.js";
import hits_extractor from "../../utils/elastic_search/hits_extractor.js";

export default async function dbGetListing(req) {
	let result;
	const query_template = {
		size: 1,
		query: {},
	};

	const { id } = req.params;
	const num_id = Number(id);

	if (Number.isNaN(num_id)) throw new ValidationError();

	const es_query = query_template;
	es_query.query.term = { prod_id: num_id };
	try {
		// get one listing from elastic search with id
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
