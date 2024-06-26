import { ValidationError } from "../api_error.js";

const filterQuery = (query_template, filters) => {
	const es_query = query_template;
	es_query.query.bool = {
		...(es_query.query.bool ?? {}),
		filter: [...(es_query.query.bool?.filter ?? [])],
	};

	const range_query = {
		range: {},
	};

	const key_helper = (index) => {
		switch (index) {
			case 0:
				return "department";
			case 1:
				return "category";
			case 2:
				return "subCategory";
			default:
				return "department";
		}
	};

	const processSimpleFilter = (filterArray, termKey) => {
		const bool_template = {
			bool: {
				should: filterArray.map((item) => ({
					term: { [termKey]: item },
				})),
			},
		};
		es_query.query.bool.filter.push(bool_template);
	};

	const processObjectFilter = (filterArray, defaultKey) => {
		const bool_template = {
			bool: {
				should: filterArray.map((str) => {
					const bool_filter_template = {
						bool: { filter: [] },
					};

					str.split("@").forEach((k, index) => {
						bool_filter_template.bool.filter.push({
							term: {
								[defaultKey && index === 2 ? defaultKey : key_helper(index)]: k,
							},
						});
					})

					return bool_filter_template;
				}),
			},
		};
		es_query.query.bool.filter.push(bool_template);
	};

	try {
		Object.keys(filters).forEach((filter) => {
			const filterArray = filters[filter];

			switch (filter) {
				case "designers":
					processSimpleFilter(filterArray, "designer.keyword");
					break;
				case "department":
				case "condition":
					processSimpleFilter(filterArray, filter);
					break;
				case "newArrivals":
					// range_query.range.updated_at = { gte: getISODate30DaysAgo() };
					// es_query.query.bool.filter.push(range_query);
					// range_query = { range: {} };
					es_query.size = 8;
					es_query.sort = [{ created_at: "desc" }];
					es_query.query = { match_all: {} };
					break;
				case "price_ground":
				case "price_ceil":
					range_query.range.price = range_query.range.price || {};
					range_query.range.price[filter === "price_ground" ? "gte" : "lte"] = Number(
						filters[filter],
					);
					break;
				case "cursor":
					if (filters[filter]) es_query.search_after = filters[filter];
					break;
				case "subCategory":
					processObjectFilter(filterArray);
					break;
				case "sizes":
					processObjectFilter(filterArray, "size");
					break;
				default:
					break;
			}
		});

		if (Object.keys(range_query.range).length > 0) {
			es_query.query.bool.filter.push(range_query);
		}
	} catch (err) {
		console.log(err);
		throw new ValidationError();
	}

	// console.log(es_query)

	return es_query;
};

export default filterQuery;
