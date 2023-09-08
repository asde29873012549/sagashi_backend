import express from "express";
import listingController from "../controllers/listingController.js";

import upload from "../middleware/multer_upload.js";

const router = express.Router();

router.get("/", listingController.getListing);
router.get("/like", listingController.getListingLikeCount);
router.post("/like", listingController.likeListing);
router.get("/like/:username", listingController.getUserLikeListing);
router.post("/create", upload.array("photo", 6), listingController.createListing);

router.get("/draft/:username", listingController.getListingDraft);
router.post("/draft", upload.array("photo", 6), listingController.saveListingDraft);

router.get("/:id", listingController.getListing);

export default router;
