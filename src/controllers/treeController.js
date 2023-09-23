import dbGetTree from "../services/tree/dbGetTree.js";
import Response from "../utils/response_template.js";

const treeController = {
	getTree: async (req, res, next) => {
		try {
			const data = await dbGetTree(req);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			return next(err);
		}
	},
};

export default treeController;
