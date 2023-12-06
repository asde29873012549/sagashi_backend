import express from "express";
import listingController from "../controllers/listingController.js";
import tokenAuthentication from "../middleware/tokenAuthentication.js";

import upload from "../middleware/multer_upload.js";

const router = express.Router();

router.post("/", listingController.getAllListing);
router.get("/like/:listing_id", tokenAuthentication, listingController.getListingLikeCount);
router.post("/like", tokenAuthentication, listingController.likeListing);
router.get("/like", tokenAuthentication, listingController.getUserLikeListing);
router.get("/color", listingController.getColor);
router.get("/condition", listingController.getCondition);
router.get("/similar", listingController.getSimilarListing);
router.get("/recentlyViewed", tokenAuthentication, listingController.getRecentlyViewed);
router.post("/recentlyViewed", tokenAuthentication, listingController.addRecentlyViewed);
router.post(
	"/create",
	tokenAuthentication,
	upload.array("photo", 6),
	listingController.createListing,
);

router.get("/draft/:username", tokenAuthentication, listingController.getListingDraft);
router.get("/draft", tokenAuthentication, listingController.getSingleListingDraft);
router.post(
	"/draft",
	tokenAuthentication,
	upload.array("photo", 6),
	listingController.saveListingDraft,
);

router.get("/curation", listingController.getCuration);
router.get("/curation/:curation_id", listingController.getProductFromCuration);

router.post("/offer", tokenAuthentication, listingController.createOffer);

router.get("/:id", listingController.getSingleListing);

export default router;
