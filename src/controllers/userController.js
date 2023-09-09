import dbGetUser from "../services/user/dbGetUser.js";
import dbUpdateUser from "../services/user/dbUpdateUser.js";
import dbUpdatePassword from "../services/user/dbUpdatePassword.js";
import dbRegister from "../services/user/dbRegister.js";
import dbLoginIn from "../services/user/dbLoginIn.js";
import dbGetShoppingCart from "../services/user/dbGetShoppingCart.js";
import dbGetChatroom from "../services/user/dbGetChatroom.js";
import Response from "../utils/response_template.js";

const userController = {
	getUser: async (req, res) => {
		try {
			const data = await dbGetUser(req, res);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			console.log(err);
			return res.status(err.status || 500).json(new Response(err).fail());
		}
	},
	updateUser: async (req, res) => {
		try {
			const data = await dbUpdateUser(req, res);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			console.log(err);
			return res.status(err.status || 500).json(new Response(err).fail());
		}
	},
	updatePassword: async (req, res) => {
		try {
			const data = await dbUpdatePassword(req, res);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			console.log(err);
			return res.status(err.status || 500).json(new Response(err).fail());
		}
	},
	login: async (req, res) => {
		try {
			const data = await dbLoginIn(req);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			if (err.status === 404 && err.message === "Resource Already Exist") {
				return res
					.status(err.status)
					.json(new Response({ message: "This Account does not exists. Please Register" }).fail());
			}
			return res.status(err.status || 500).json(new Response(err).fail());
		}
	},
	register: async (req, res) => {
		try {
			await dbRegister(req);
			return res.status(200).json(new Response("Success").success());
		} catch (err) {
			if (err.status === 404 && err.message === "Resource Already Exist") {
				return res
					.status(err.status)
					.json(new Response({ message: "This Account already exists. Please Log in" }).fail());
			}
			return res.status(err.status || 500).json(new Response(err).fail());
		}
	},
	getShopppingCart: async (req, res) => {
		try {
			const data = await dbGetShoppingCart(req, res);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			console.log(err);
			return res.status(err.status || 500).json(new Response(err).fail());
		}
	},
	getChatroom: async (req, res) => {
		try {
			const data = await dbGetChatroom(req, res);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			console.log(err);
			return res.status(err.status || 500).json(new Response(err).fail());
		}
	},
};

export default userController;
