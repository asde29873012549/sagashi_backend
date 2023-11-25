import express from "express";
import searchController from "../controllers/searchController.js";

const router = express.Router();

router.post("/", searchController.searchKeyword);
router.get("/guideKeyword", searchController.guideKeyword);

export default router;
