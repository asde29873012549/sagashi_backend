import dbSearchKeyword from "../services/search/dbSearchKeyword.js";
import dbGetGuideKeyword from "../services/search/dbGetGuideKeyword.js";
import Response from "../utils/response_template.js";

const userController = {
	searchKeyword: async (req, res, next) => {
		try {
			const data = await dbSearchKeyword(req, res);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			return next(err);
		}
	},
	guideKeyword: async (req, res, next) => {
		try {
			const data = await dbGetGuideKeyword(req, res);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			return next(err);
		}
	},
};

export default userController;
