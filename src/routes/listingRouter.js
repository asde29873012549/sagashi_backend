import express from "express";
import listingController from "../controllers/listingController.js";
import tokenAuthentication from "../middleware/tokenAuthentication.js";

import upload from "../middleware/multer_upload.js";

const router = express.Router();

router.get("/", listingController.getAllListing);
router.get("/like", tokenAuthentication, listingController.getListingLikeCount);
router.post("/like", tokenAuthentication, listingController.likeListing);
router.get("/like/:username", tokenAuthentication, listingController.getUserLikeListing);
router.post(
	"/create",
	tokenAuthentication,
	upload.array("photo", 6),
	listingController.createListing,
);

router.get("/draft/:username", tokenAuthentication, listingController.getListingDraft);
router.post(
	"/draft",
	tokenAuthentication,
	upload.array("photo", 6),
	listingController.saveListingDraft,
);

router.get("/:id", listingController.getSingleListing);

export default router;
