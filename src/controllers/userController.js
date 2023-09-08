import dbGetUser from "../services/user/dbGetUser.js";
import dbUpdateUser from "../services/user/dbUpdateUser.js";
import dbUpdatePassword from "../services/user/dbUpdatePassword.js";
import dbRegister from "../services/user/dbRegister.js";
import Response from "../utils/response_template.js";

const userController = {
	getUser: async (req, res) => {
		try {
			const data = await dbGetUser(req);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			console.log(err);
			return res.status(err.status || 500).json(new Response(err).fail());
		}
	},
	updateUser: async (req, res) => {
		try {
			const data = await dbUpdateUser(req);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			console.log(err);
			return res.status(err.status || 500).json(new Response(err).fail());
		}
	},
	updatePassword: async (req, res) => {
		try {
			const data = await dbUpdatePassword(req);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			console.log(err);
			return res.status(err.status || 500).json(new Response(err).fail());
		}
	},
	login: async (req, res) => {},
	register: async (req, res) => {
		try {
			await dbRegister(req);
			return res
				.status(200)
				.json(new Response("Congratulations, you have now succesfully registered").success());
		} catch (err) {
			if (err.status === 404 && err.message === "Resource Already Exist") {
				return res
					.status(err.status)
					.json(new Response({ message: "This Account already exists. Please Log in" }).fail());
			}
			return res.status(err.status || 500).json(new Response(err).fail());
		}
	},
	getShopppingBag: async (req, res) => {},
	getMessages: async (req, res) => {},
};

export default userController;
