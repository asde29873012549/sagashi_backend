import dbGetDesigners from "../services/designer/dbGetDesigners.js";
import dbGetSingleDesigner from "../services/designer/dbGetSingleDesigner.js";
import dbFollowDesigner from "../services/designer/dbFollowDesigner.js";
import dbGetFeaturedDesigners from "../services/designer/dbGetFeaturedDesigners.js";
import dbGetRelatedDesigners from "../services/designer/dbGetRelatedDesigners.js";
import dbGetPopularDesigners from "../services/designer/dbGetPopularDesigners.js";
import Response from "../utils/response_template.js";

const designerController = {
	getDesigners: async (req, res, next) => {
		try {
			const data = await dbGetDesigners(req, res);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			return next(err);
		}
	},
	getSingleDesigner: async (req, res, next) => {
		try {
			const data = await dbGetSingleDesigner(req, res);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			return next(err);
		}
	},
	followDesigner: async (req, res, next) => {
		try {
			const data = await dbFollowDesigner(req, res);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			return next(err);
		}
	},
	getFeaturedDesigners: async (req, res, next) => {
		try {
			const data = await dbGetFeaturedDesigners(req);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			return next(err);
		}
	},
	getRelatedDesigners: async (req, res, next) => {
		try {
			const data = await dbGetRelatedDesigners(req);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			return next(err);
		}
	},
	getPopularDesigners: async (req, res, next) => {
		try {
			const data = await dbGetPopularDesigners();
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			return next(err);
		}
	},
};

export default designerController;
