import dbGetMessage from "../services/message/dbGetMessage.js";
import dbCreateMessage from "../services/message/dbCreateMessage.js";
import Response from "../utils/response_template.js";

const userController = {
	getMessages: async (req, res) => {
		try {
			const data = await dbGetMessage(req, res);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			console.log(err);
			return res.status(err.status || 500).json(new Response(err).fail());
		}
	},
	createMessages: async (req, res) => {
		try {
			const data = await dbCreateMessage(req, res);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			console.log(err);
			return res.status(err.status || 500).json(new Response(err).fail());
		}
	},
};

export default userController;
