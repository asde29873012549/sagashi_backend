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
router.post(
	"/create",
	tokenAuthentication,
	upload.fields(
		["primary_image", "image_0", "image_1", "image_2", "image_3", "image_4", "image_5"].map(
			(item) => ({ name: item === "primary_image" ? "primary_image" : item, maxCount: 1 }),
		),
	),
	listingController.createListing,
);

router.get("/draft/:username", tokenAuthentication, listingController.getListingDraft);
router.get("/draft", tokenAuthentication, listingController.getSingleListingDraft);
router.post(
	"/draft",
	tokenAuthentication,
	upload.fields(
		["primary_image", "image_0", "image_1", "image_2", "image_3", "image_4", "image_5"].map(
			(item) => ({ name: item === "primary_image" ? "primary_image" : item, maxCount: 1 }),
		),
	),
	listingController.saveListingDraft,
);

router.get("/curation", listingController.getCuration);
router.get("/curation/:curation_id", listingController.getProductFromCuration);

router.post("/offer", tokenAuthentication, listingController.createOffer);

router.get("/:id", listingController.getSingleListing);
router.put(
	"/:id",
	tokenAuthentication,
	upload.fields(
		["primary_image", "image_0", "image_1", "image_2", "image_3", "image_4", "image_5"].map(
			(item) => ({ name: item === "primary_image" ? "primary_image" : item, maxCount: 1 }),
		),
	),
	listingController.editSingleListing,
);

export default router;
