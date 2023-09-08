import dbCreateListing from "../services/listing/dbCreateListing.js";
import dbGetListing from "../services/listing/dbGetListing.js";
import dbLikeListing from "../services/listing/dbLikeListing.js";
import dbGetUserLikeListing from "../services/listing/dbGetUserLikeListing.js";
import dbGetListingLikeCount from "../services/listing/dbGetListingLikeCount.js";
import dbSaveListingDraft from "../services/listing/dbSaveListingDraft.js";
import dbGetListingDraft from "../services/listing/dbGetListingDraft.js";
import Response from "../utils/response_template.js";

const listingController = {
	createListing: async (req, res) => {
		try {
			const data = await dbCreateListing(req);
			res.status(200).json(new Response(data).success());
		} catch (err) {
			console.log(err);
			res.status(err.status || 500).json(new Response(err).fail());
		}
	},
	getListing: async (req, res) => {
		try {
			const data = await dbGetListing(req);
			res.status(200).json(new Response(data).success());
		} catch (err) {
			res.status(err.status || 500).json(new Response(err).fail());
		}
	},
	likeListing: async (req, res) => {
		try {
			const data = await dbLikeListing(req);
			res.status(200).json(new Response(data).success());
		} catch (err) {
			res.status(err.status || 500).json(new Response(err).fail());
		}
	},
	getUserLikeListing: async (req, res) => {
		try {
			const data = await dbGetUserLikeListing(req);
			res.status(200).json(new Response(data).success());
		} catch (err) {
			res.status(err.status || 500).json(new Response(err).fail());
		}
	},
	getListingLikeCount: async (req, res) => {
		try {
			const data = await dbGetListingLikeCount(req);
			res.status(200).json(new Response(data).success());
		} catch (err) {
			res.status(err.status || 500).json(new Response(err).fail());
		}
	},
	saveListingDraft: async (req, res) => {
		try {
			const data = await dbSaveListingDraft(req);
			res.status(200).json(new Response(data).success());
		} catch (err) {
			res.status(err.status || 500).json(new Response(err).fail());
		}
	},
	getListingDraft: async (req, res) => {
		try {
			const data = await dbGetListingDraft(req);
			res.status(200).json(new Response(data).success());
		} catch (err) {
			res.status(err.status || 500).json(new Response(err).fail());
		}
	},
};

export default listingController;
