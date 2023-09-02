import dbCreateListing from "../services/listing/dbCreateListing.js";
import dbGetListing from "../services/listing/dbGetListing.js";
import Response from "../utils/response_template.js";

const listingController = {
	createListing: async (req, res) => {
		try {
			const data = await dbCreateListing(req);
			res.status(200).json(new Response(data).success());
		} catch (err) {
			res.status(err.status).json(new Response(err).fail());
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
};

export default listingController;
