import dbGetMessage from "../services/message/dbGetMessage.js";
import dbCreateMessage from "../services/message/dbCreateMessage.js";
import dbReadMessage from "../services/message/dbReadMessage.js";
import dbGetAllChatroom from "../services/message/dbGetAllChatroom.js";
import dbReadAllMessage from "../services/message/dbReadAllMessage.js";
import Response from "../utils/response_template.js";

const userController = {
	getAllChatroom: async (req, res, next) => {
		try {
			const data = await dbGetAllChatroom(req, res);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			return next(err);
		}
	},
	getMessages: async (req, res, next) => {
		try {
			const data = await dbGetMessage(req, res);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			return next(err);
		}
	},
	createMessages: async (req, res, next) => {
		try {
			const data = await dbCreateMessage(req, res);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			return next(err);
		}
	},
	readMessages: async (req, res, next) => {
		try {
			const data = await dbReadMessage(req, res);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			return next(err);
		}
	},
	readAllMessages: async (req, res, next) => {
		try {
			const data = await dbReadAllMessage(req, res, true);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			return next(err);
		}
	}
};

export default userController;