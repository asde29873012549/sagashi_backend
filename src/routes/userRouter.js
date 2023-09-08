import express from "express";
import userController from "../controllers/userController.js";
import tokenAuthentication from "../middleware/tokenAuthentication.js";

const router = express.Router();

router.post("/login", userController.login);
router.post("/register", userController.register);

router.get("/:username", userController.getUser);
router.post("/:username", userController.updateUser);

router.get("/:username/shoppingBag", userController.getShopppingBag);
router.get("/:username/messages", userController.getMessages);
router.post("/:username/password", userController.updatePassword);

export default router;
