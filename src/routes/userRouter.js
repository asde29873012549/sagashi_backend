import express from "express";
import userController from "../controllers/userController.js";
import tokenAuthentication from "../middleware/tokenAuthentication.js";

const router = express.Router();

router.post("/login", userController.login);
router.post("/register", userController.register);

router.get("/:username", tokenAuthentication, userController.getUser);
router.post("/:username", tokenAuthentication, userController.updateUser);

router.get("/:username/shoppingCart", tokenAuthentication, userController.getShopppingCart);
router.post("/:username/shoppingCart", tokenAuthentication, userController.addShopppingCartItem);
router.get("/:username/chatroom", tokenAuthentication, userController.getChatroom);
router.post("/:username/password", tokenAuthentication, userController.updatePassword);

export default router;
