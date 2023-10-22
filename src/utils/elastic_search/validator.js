import { ValidationError } from "../api_error.js";

const validator = (valid_query, filter) => {
	const req_queries = Object.keys(filter);

	if (req_queries.length === 0) return req_queries;

	// check for invalid query parameters
	req_queries.forEach((query) => {
		if (!valid_query.includes(query)) throw new ValidationError();
	});

	// check for validation for each queries

	// cursor query
	if (req_queries.includes("cursor")) {
		const decoded = decodeURI(filter.cursor);
		if (!decoded) throw new ValidationError();
		const parsed = JSON.parse(decoded);
		if (!parsed) throw new ValidationError();
	}

	// price_ceil & price_ground query
	if (req_queries.includes("price_ceil") && Number.isNaN(Number(filter.price_ceil)))
		throw new ValidationError();
	if (req_queries.includes("price_ground") && Number.isNaN(Number(filter.price_ground)))
		throw new ValidationError();

	// newArrivals params
	if (req_queries.includes("newArrivals")) {
		if (filter.newArrivals !== "true" && filter.newArrivals !== "false")
			throw new ValidationError();
	}

	return req_queries;
};

export default validator;
