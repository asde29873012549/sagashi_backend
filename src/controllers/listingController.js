import dbCreateListing from "../services/listing/dbCreateListing.js";
import dbGetAllListing from "../services/listing/dbGetAllListing.js";
import dbGetSingleListing from "../services/listing/dbGetSingleListing.js";
import dbLikeListing from "../services/listing/dbLikeListing.js";
import dbGetUserLikeListing from "../services/listing/dbGetUserLikeListing.js";
import dbGetListingLikeCount from "../services/listing/dbGetListingLikeCount.js";
import dbSaveListingDraft from "../services/listing/dbSaveListingDraft.js";
import dbGetListingDraft from "../services/listing/dbGetListingDraft.js";
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
};

export default listingController;
