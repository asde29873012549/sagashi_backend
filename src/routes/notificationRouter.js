import express from "express";
import notificationController from "../controllers/notificationController.js";
import tokenAuthentication from "../middleware/tokenAuthentication.js";

const router = express.Router();

router.get("/", tokenAuthentication, notificationController.getNotifications);
router.post("/", tokenAuthentication, notificationController.createNotifications);
router.put("/", tokenAuthentication, notificationController.readNotifications);

router.get("/subscriber", tokenAuthentication, notificationController.getSubscriber);

export default router;
