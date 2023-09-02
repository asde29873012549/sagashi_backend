import express from "express";
import listingController from "../controllers/listingController.js";

import upload from "../middleware/multer_upload.js";

const router = express.Router();

router.get("/", listingController.getListing);
router.get("/:id", listingController.getListing);
router.post("/create", upload.array("photo", 6), listingController.createListing);

export default router;
