import dbGetNotification from "../services/notification/dbGetNotification.js";
import dbCreateNotification from "../services/notification/dbCreateNotification.js";
import dbReadNotification from "../services/notification/dbReadNotification.js";
import dbGetSubscriber from "../services/notification/dbGetSubscriber.js";
import Response from "../utils/response_template.js";

const userController = {
	getNotifications: async (req, res, next) => {
		try {
			const data = await dbGetNotification(req, res);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			return next(err);
		}
	},
	createNotifications: async (req, res, next) => {
		try {
			const data = await dbCreateNotification(req, res);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			return next(err);
		}
	},
	readNotifications: async (req, res, next) => {
		try {
			const data = await dbReadNotification(req, res);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			return next(err);
		}
	},
	getSubscriber: async (req, res, next) => {
		try {
			const data = await dbGetSubscriber(req, res);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			return next(err);
		}
	},
};

export default userController;
