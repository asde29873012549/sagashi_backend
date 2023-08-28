import express from "express";
import listingController from "../controllers/listingController.js";

const router = express.Router();

router.post("/create", listingController.createListing);

export default router;