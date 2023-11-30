import express from "express";
import messageController from "../controllers/messageController.js";
import tokenAuthentication from "../middleware/tokenAuthentication.js";

const router = express.Router();

router.get("/", tokenAuthentication, messageController.getAllChatroom);
router.get("/:chatroom_id", tokenAuthentication, messageController.getMessages);
router.post("/", tokenAuthentication, messageController.createMessages);
router.put("/", tokenAuthentication, messageController.readMessages);

export default router;
