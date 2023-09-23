import express from "express";
import treeController from "../controllers/treeController.js";

const router = express.Router();

router.get("/", treeController.getTree);

export default router;
