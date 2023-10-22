import dbCreateListing from "../services/listing/dbCreateListing.js";
import dbGetAllListing from "../services/listing/dbGetAllListing.js";
import dbGetSingleListing from "../services/listing/dbGetSingleListing.js";
import dbLikeListing from "../services/listing/dbLikeListing.js";
import dbGetUserLikeListing from "../services/listing/dbGetUserLikeListing.js";
import dbGetListingLikeCount from "../services/listing/dbGetListingLikeCount.js";
import dbSaveListingDraft from "../services/listing/dbSaveListingDraft.js";
import dbGetListingDraft from "../services/listing/dbGetListingDraft.js";
import dbGetSingleListingDraft from "../services/listing/dbGetSingleListingDraft.js";
import dbGetRecentlyViewed from "../services/listing/dbGetRecentlyViewed.js";
import dbAddRecentlyViewed from "../services/listing/dbAddRecentlyViewed.js";
import dbGetCuration from "../services/listing/dbGetCuration.js";
import dbGetProductFromCuration from "../services/listing/dbGetProductFromCuration.js";
import dbCreateOffer from "../services/listing/dbCreateOffer.js";
import dbGetColor from "../services/listing/dbGetColor.js";
import dbGetCondition from "../services/listing/dbGetCondition.js";
import dbGetSimilarListing from "../services/listing/dbGetSimilarListing.js";
import Response from "../utils/response_template.js";

const listingController = {
	createListing: async (req, res, next) => {
		try {
			const data = await dbCreateListing(req, res);
			res.status(200).json(new Response(data).success());
		} catch (err) {
			next(err);
		}
	},
	getAllListing: async (req, res, next) => {
		try {
			const data = await dbGetAllListing(req);
			res.status(200).json(new Response(data).success());
		} catch (err) {
			next(err);
		}
	},
	getSingleListing: async (req, res, next) => {
		try {
			const data = await dbGetSingleListing(req);
			res.status(200).json(new Response(data).success());
		} catch (err) {
			next(err);
		}
	},
	likeListing: async (req, res, next) => {
		try {
			const data = await dbLikeListing(req, res);
			res.status(200).json(new Response(data).success());
		} catch (err) {
			next(err);
		}
	},
	getUserLikeListing: async (req, res, next) => {
		try {
			const data = await dbGetUserLikeListing(req, res);
			res.status(200).json(new Response(data).success());
		} catch (err) {
			next(err);
		}
	},
	getListingLikeCount: async (req, res, next) => {
		try {
			const data = await dbGetListingLikeCount(req, res);
			res.status(200).json(new Response(data).success());
		} catch (err) {
			next(err);
		}
	},
	saveListingDraft: async (req, res, next) => {
		try {
			const data = await dbSaveListingDraft(req, res);
			res.status(200).json(new Response(data).success());
		} catch (err) {
			next(err);
		}
	},
	getListingDraft: async (req, res, next) => {
		try {
			const data = await dbGetListingDraft(req, res);
			res.status(200).json(new Response(data).success());
		} catch (err) {
			next(err);
		}
	},
	getSingleListingDraft: async (req, res, next) => {
		try {
			const data = await dbGetSingleListingDraft(req, res);
			res.status(200).json(new Response(data).success());
		} catch (err) {
			next(err);
		}
	},
	getRecentlyViewed: async (req, res, next) => {
		try {
			const data = await dbGetRecentlyViewed(req, res);
			res.status(200).json(new Response(data).success());
		} catch (err) {
			next(err);
		}
	},
	addRecentlyViewed: async (req, res, next) => {
		try {
			const data = await dbAddRecentlyViewed(req, res);
			res.status(200).json(new Response(data).success());
		} catch (err) {
			next(err);
		}
	},
	getCuration: async (req, res, next) => {
		try {
			const data = await dbGetCuration();
			res.status(200).json(new Response(data).success());
		} catch (err) {
			next(err);
		}
	},
	getProductFromCuration: async (req, res, next) => {
		try {
			const data = await dbGetProductFromCuration(req);
			res.status(200).json(new Response(data).success());
		} catch (err) {
			next(err);
		}
	},
	createOffer: async (req, res, next) => {
		try {
			const data = await dbCreateOffer(req);
			res.status(200).json(new Response(data).success());
		} catch (err) {
			next(err);
		}
	},
	getColor: async (req, res, next) => {
		try {
			const data = await dbGetColor(req);
			res.status(200).json(new Response(data).success());
		} catch (err) {
			next(err);
		}
	},
	getCondition: async (req, res, next) => {
		try {
			const data = await dbGetCondition(req);
			res.status(200).json(new Response(data).success());
		} catch (err) {
			next(err);
		}
	},
	getSimilarListing: async (req, res, next) => {
		try {
			const data = await dbGetSimilarListing(req);
			res.status(200).json(new Response(data).success());
		} catch (err) {
			next(err);
		}
	},
};

export default listingController;
