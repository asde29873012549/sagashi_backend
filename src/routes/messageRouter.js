import express from "express";
import messageController from "../controllers/messageController.js";
import tokenAuthentication from "../middleware/tokenAuthentication.js";

const router = express.Router();

router.get("/:chatroom_id", tokenAuthentication, messageController.getMessages);
router.post("/", tokenAuthentication, messageController.createMessages);

export default router;
