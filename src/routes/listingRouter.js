import express from "express";
import listingController from "../controllers/listingController.js";

import upload from "../middleware/multer_upload.js";

const router = express.Router();

router.get("/", listingController.getListing);
router.get("/:id", listingController.getListing);
router.post("/create", upload.array("photo", 6), listingController.createListing);
router.get("/like/:username", listingController.getLikeListing);
router.post("/like", listingController.likeListing);

router.get("/draft/:username", listingController.getListingDraft);
router.post("/draft", upload.array("photo", 6), listingController.saveListingDraft);

export default router;
