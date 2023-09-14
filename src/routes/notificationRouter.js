import express from "express";
import notificationController from "../controllers/notificationController.js";
import tokenAuthentication from "../middleware/tokenAuthentication.js";

const router = express.Router();

router.get("/:username", tokenAuthentication, notificationController.getNotifications);
router.post("/", tokenAuthentication, notificationController.createNotifications);

export default router;
