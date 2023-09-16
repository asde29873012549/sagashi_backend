import dbGetUserInfo from "../services/user/dbGetUserInfo.js";
import dbUpdateUserInfo from "../services/user/dbUpdateUserInfo.js";
import dbUpdatePassword from "../services/user/dbUpdatePassword.js";
import dbRegister from "../services/user/dbRegister.js";
import dbLoginIn from "../services/user/dbLoginIn.js";
import dbGetShoppingCart from "../services/user/dbGetShoppingCart.js";
import dbAddShoppingCartItem from "../services/user/dbAddShoppingCartItem.js";
import dbGetUserListing from "../services/user/dbGetUserListing.js";
import dbGetUserShippingAddress from "../services/user/dbGetUserShippingAddress.js";
import dbUpdateUserShippingAddress from "../services/user/dbUpdateUserShippingAddress.js";
import dbCreateUserShippingAddress from "../services/user/dbCreateUserShippingAddress.js";
import dbDeleteUserShippingAddress from "../services/user/dbDeleteUserShippingAddress.js"
import dbGetUserFollwer from "../services/user/dbGetUserFollwer.js";
import dbFollowUser from "../services/user/dbFollowUser.js";
import dbSubscribe from "../services/user/dbSubscribe.js";
import dbGetChatroom from "../services/user/dbGetChatroom.js";
import Response from "../utils/response_template.js";

const userController = {
	getUserInfo: async (req, res) => {
		try {
			const data = await dbGetUserInfo(req, res);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			console.log(err);
			return res.status(err.status || 500).json(new Response(err).fail());
		}
	},
	updateUserInfo: async (req, res) => {
		try {
			const data = await dbUpdateUserInfo(req, res);
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
	addShopppingCartItem: async (req, res) => {
		try {
			const data = await dbAddShoppingCartItem(req, res);
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
	getUserListing: async (req, res) => {
		try {
			const data = await dbGetUserListing(req, res);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			console.log(err);
			return res.status(err.status || 500).json(new Response(err).fail());
		}
	},
	getUserShippingAddress: async (req, res) => {
		try {
			const data = await dbGetUserShippingAddress(req, res);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			console.log(err);
			return res.status(err.status || 500).json(new Response(err).fail());
		}
	},
	createUserShippingAddress: async (req, res) => {
		try {
			const data = await dbCreateUserShippingAddress(req, res);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			console.log(err);
			return res.status(err.status || 500).json(new Response(err).fail());
		}
	},
	updateUserShippingAddress: async (req, res) => {
		try {
			const data = await dbUpdateUserShippingAddress(req, res);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			console.log(err);
			return res.status(err.status || 500).json(new Response(err).fail());
		}
	},
	deleteUserShippingAddress: async (req, res) => {
		try {
			const data = await dbDeleteUserShippingAddress(req, res);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			console.log(err);
			return res.status(err.status || 500).json(new Response(err).fail());
		}
	},
	getUserFollwer: async (req, res) => {
		try {
			const data = await dbGetUserFollwer(req, res);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			console.log(err);
			return res.status(err.status || 500).json(new Response(err).fail());
		}
	},
	followUser: async (req, res) => {
		try {
			const data = await dbFollowUser(req, res);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			console.log(err);
			return res.status(err.status || 500).json(new Response(err).fail());
		}
	},
	subscribe: async (req, res) => {
		try {
			const data = await dbSubscribe(req, res);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			console.log(err);
			return res.status(err.status || 500).json(new Response(err).fail());
		}
	}
};

export default userController;
