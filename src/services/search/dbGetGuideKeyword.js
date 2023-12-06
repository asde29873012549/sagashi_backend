import * as dotenv from "dotenv";
import { errors as EsError } from "@elastic/elasticsearch";
import {
	ServiceUnavailableError,
	ValidationError,
	ElasticSearchError,
} from "../../utils/api_error.js";
import client from "../../../elastic_search/client.js";
import categoryInvertedData from "../../data/categoryData_invert_index.js";

dotenv.config();

const product_index = process.env.ES_PRODUCT_INDEX;
const designer_index = process.env.ES_DESIGNER_INDEX;

export default async function dbGuideKeyword(req) {
	let result;

	const { limit, cursor, keyword } = req.query;

	const query_template = {
		size: limit || 20,
		_source: ["highlight", "designer", "subCategory"],
		query: {
			bool: {
				should: [
					{
						match: {
							name: {
								query: keyword,
								fuzziness: "auto",
								boost: 15,
							},
						},
					},
					{
						match: {
							"subCategory.text": {
								query: keyword,
								fuzziness: 1,
								boost: 5,
							},
						},
					},
					{
						match: {
							designer: {
								query: keyword,
								fuzziness: "auto",
								boost: 10,
							},
						},
					},
				],
			},
		},
		highlight: {
			pre_tags: ["<strong style='color: #155E75'>"],
			post_tags: ["</strong>"],
			fields: {
				name: {},
				designer: {},
				"subCategory.text": {},
			},
		},
	};

	const es_query = query_template;
	if (cursor) es_query.search_after = JSON.parse(decodeURI(cursor));

	try {
		const data = await client.search(es_query);
		const designerData = () => {
			const res = [];
			data.hits.hits.forEach((hit) => {
				if (hit._index === designer_index) {
					res.push(hit.highlight.name[0]);
				}
			});
			return res;
		};
		const popularData = () => {
			const res = [];
			data.hits.hits.forEach((hit) => {
				if (hit._index === product_index) {
					const { designer, subCategory } = hit._source;
					res.push(
						`${hit.highlight.designer?.[0] || designer} ${
							hit.highlight["subCategory.text"]
								? `<strong style='color: #0C4A6E'>${categoryInvertedData[subCategory]}</strong>`
								: categoryInvertedData[subCategory]
						}`,
					);
				}
			});
			return res;
		};
		result = {
			designers: designerData(),
			popular: popularData(),
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

	return result;
}
