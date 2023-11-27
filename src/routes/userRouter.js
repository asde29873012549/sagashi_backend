import express from "express";
import userController from "../controllers/userController.js";
import tokenAuthentication from "../middleware/tokenAuthentication.js";

const router = express.Router();

router.post("/login", userController.login);
router.post("/register", userController.register);
router.post("/refreshToken", userController.refreshToken);
router.get("/listing", tokenAuthentication, userController.getUserListing);

router.get("/:username/info", tokenAuthentication, userController.getUserInfo);
router.put("/:username/info", tokenAuthentication, userController.updateUserInfo);
router.get("/public/:username/info", userController.getPublicUserInfo);

router.get(
	"/:username/shippingAddress",
	tokenAuthentication,
	userController.getUserShippingAddress,
);
router.put(
	"/:username/shippingAddress",
	tokenAuthentication,
	userController.updateUserShippingAddress,
);
router.post(
	"/:username/shippingAddress",
	tokenAuthentication,
	userController.createUserShippingAddress,
);
router.delete(
	"/:username/shippingAddress/:id",
	tokenAuthentication,
	userController.deleteUserShippingAddress,
);

router.get("/:username/follow", tokenAuthentication, userController.getUserFollwer);
router.post("/follow/check", tokenAuthentication, userController.checkIsFollow);
router.post("/follow", tokenAuthentication, userController.followUser);

router.get("/:username/shoppingCart", tokenAuthentication, userController.getShopppingCart);
router.post("/:username/shoppingCart", tokenAuthentication, userController.addShopppingCartItem);
router.delete(
	"/:username/shoppingCart/:product_id",
	tokenAuthentication,
	userController.deleteShopppingCartItem,
);

router.get("/:username/chatroom", tokenAuthentication, userController.getChatroom);

router.post("/:username/password", tokenAuthentication, userController.updatePassword);

router.post("/:username/subscribe", tokenAuthentication, userController.subscribe);

export default router;
