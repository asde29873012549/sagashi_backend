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

const designer_index = process.env.ES_DESIGNER_INDEX;

export default async function dbGetPopularDesigners() {
	let result;

	const query_template = {
		size: 20,
		index: designer_index,
		query: {
			match_all: {},
		},
	};

	const es_query = query_template;
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
