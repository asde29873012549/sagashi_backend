import dbGetUserInfo from "../services/user/dbGetUserInfo.js";
import dbUpdateUserInfo from "../services/user/dbUpdateUserInfo.js";
import dbUpdatePassword from "../services/user/dbUpdatePassword.js";
import dbRegister from "../services/user/dbRegister.js";
import dbLoginIn from "../services/user/dbLoginIn.js";
import dbGetShoppingCart from "../services/user/dbGetShoppingCart.js";
import dbAddShoppingCartItem from "../services/user/dbAddShoppingCartItem.js";
import dbDeleteShoppingCartItem from "../services/user/dbDeleteShoppingCartItem.js";
import dbGetUserListing from "../services/user/dbGetUserListing.js";
import dbGetUserShippingAddress from "../services/user/dbGetUserShippingAddress.js";
import dbUpdateUserShippingAddress from "../services/user/dbUpdateUserShippingAddress.js";
import dbCreateUserShippingAddress from "../services/user/dbCreateUserShippingAddress.js";
import dbDeleteUserShippingAddress from "../services/user/dbDeleteUserShippingAddress.js";
import dbGetUserFollwer from "../services/user/dbGetUserFollwer.js";
import dbFollowUser from "../services/user/dbFollowUser.js";
import dbSubscribe from "../services/user/dbSubscribe.js";
import dbGetChatroom from "../services/user/dbGetChatroom.js";
import dbRefreshToken from "../services/user/dbRefreshToken.js";
import dbGetPublicUserInfo from "../services/user/dbGetPublicUserInfo.js";
import dbCheckIsFollow from "../services/user/dbCheckIsFollow.js";
import dbGetShoppingCartTotal from "../services/user/dbGetShoppingCartTotal.js";
import dbRecordRecentlyViewed from "../services/user/dbRecordRecentlyViewed.js";
import Response from "../utils/response_template.js";

const userController = {
	getUserInfo: async (req, res, next) => {
		try {
			const data = await dbGetUserInfo(req, res);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			return next(err);
		}
	},
	updateUserInfo: async (req, res, next) => {
		try {
			const data = await dbUpdateUserInfo(req, res);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			return next(err);
		}
	},
	updatePassword: async (req, res, next) => {
		try {
			const data = await dbUpdatePassword(req, res);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			return next(err);
		}
	},
	login: async (req, res, next) => {
		try {
			const data = await dbLoginIn(req);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			if (err.status === 404 && err.message === "Resource Not Found") {
				return res
					.status(err.status)
					.json(new Response({ message: "This Account does not exists. Please Register" }).fail());
			}
			return next(err);
		}
	},
	register: async (req, res, next) => {
		try {
			const data = await dbRegister(req);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			if (err.status === 404 && err.message === "Resource Already Exist") {
				return res
					.status(err.status)
					.json(new Response({ message: "This Account already exists. Please Log in" }).fail());
			}
			return next(err);
		}
	},
	getShopppingCart: async (req, res, next) => {
		try {
			const data = await dbGetShoppingCart(req, res);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			return next(err);
		}
	},
	addShopppingCartItem: async (req, res, next) => {
		try {
			const data = await dbAddShoppingCartItem(req, res);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			return next(err);
		}
	},
	getChatroom: async (req, res, next) => {
		try {
			const data = await dbGetChatroom(req, res);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			return next(err);
		}
	},
	getUserListing: async (req, res, next) => {
		try {
			const data = await dbGetUserListing(req, res);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			return next(err);
		}
	},
	getUserShippingAddress: async (req, res, next) => {
		try {
			const data = await dbGetUserShippingAddress(req, res);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			return next(err);
		}
	},
	createUserShippingAddress: async (req, res, next) => {
		try {
			const data = await dbCreateUserShippingAddress(req, res);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			return next(err);
		}
	},
	updateUserShippingAddress: async (req, res, next) => {
		try {
			const data = await dbUpdateUserShippingAddress(req, res);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			return next(err);
		}
	},
	deleteUserShippingAddress: async (req, res, next) => {
		try {
			const data = await dbDeleteUserShippingAddress(req, res);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			return next(err);
		}
	},
	getUserFollwer: async (req, res, next) => {
		try {
			const data = await dbGetUserFollwer(req, res);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			return next(err);
		}
	},
	followUser: async (req, res, next) => {
		try {
			const data = await dbFollowUser(req, res);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			return next(err);
		}
	},
	subscribe: async (req, res, next) => {
		try {
			const data = await dbSubscribe(req, res);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			return next(err);
		}
	},
	deleteShopppingCartItem: async (req, res, next) => {
		try {
			const data = await dbDeleteShoppingCartItem(req, res);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			return next(err);
		}
	},
	getShopppingCartTotal: async (req, res, next) => {
		try {
			const data = await dbGetShoppingCartTotal(req, res);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			return next(err);
		}
	},
	getPublicUserInfo: async (req, res, next) => {
		try {
			const data = await dbGetPublicUserInfo(req);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			return next(err);
		}
	},
	recordRecentlyViewed: async (req, res, next) => {
		try {
			const data = await dbRecordRecentlyViewed(req, res);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			return next(err);
		}	
	},
	checkIsFollow: async (req, res, next) => {
		try {
			const data = await dbCheckIsFollow(req, res);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			return next(err);
		}
	},
	refreshToken: async (req, res, next) => {
		try {
			const data = await dbRefreshToken(req, res);
			return res.status(200).json(new Response(data).success());
		} catch (err) {
			return next(err);
		}
	},
};

export default userController;
