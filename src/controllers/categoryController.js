import dbGetCategories from "../services/category/dbGetCategories.js";
import dbGetSizes from "../services/category/dbGetSizes.js";

import Response from "../utils/response_template.js";

const categoryController = {
	getCategories: async (req, res, next) => {
		try {
			const data = await dbGetCategories();
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			return next(err);
		}
	},
	getSizes: async (req, res, next) => {
		try {
			const data = await dbGetSizes(req, res);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			return next(err);
		}
	},
};

export default categoryController;
