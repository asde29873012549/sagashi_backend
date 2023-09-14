import dbGetNotification from "../services/notification/dbGetNotification.js";
import dbCreateNotification from "../services/notification/dbCreateNotification.js";
import Response from "../utils/response_template.js";

const userController = {
	getNotifications: async (req, res) => {
		try {
			const data = await dbGetNotification(req, res);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			console.log(err);
			return res.status(err.status || 500).json(new Response(err).fail());
		}
	},
	createNotifications: async (req, res) => {
		try {
			const data = await dbCreateNotification(req, res);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			console.log(err);
			return res.status(err.status || 500).json(new Response(err).fail());
		}
	},
};

export default userController;
