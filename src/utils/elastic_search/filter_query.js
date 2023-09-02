import { getISODate30DaysAgo } from "../date.js";

const filterQuery = (query_template, filters) => {
	const es_query = query_template;
	es_query.query.bool = {
		filter: [],
	};

	let range_query = {
		range: {},
	};

	Object.keys(filters).forEach((filter) => {
		const term_query = {
			term: {},
		};

		switch (filter) {
			case "designer":
				term_query.term[`${filter}.keyword`] = filters[filter];
				es_query.query.bool.filter.push(term_query);
				break;
			case "newArrivals":
				range_query.range.updated_at = { gte: getISODate30DaysAgo() };
				es_query.query.bool.filter.push(range_query);
				range_query = { range: {} };
				break;
			case "price_ground":
			case "price_ceil":
				range_query.range.price = range_query.range.price || {};
				range_query.range.price[filter === "price_ground" ? "gte" : "lte"] = Number(
					filters[filter],
				);
				break;
			case "cursor":
				if (filters[filter]) es_query.search_after = JSON.parse(decodeURI(filters[filter]));
				break;
			default:
				term_query.term[filter] = filters[filter];
				es_query.query.bool.filter.push(term_query);
				break;
		}
	});

	if (Object.keys(range_query.range).length > 0) {
		es_query.query.bool.filter.push(range_query);
	}
	return es_query;
};

export default filterQuery;
