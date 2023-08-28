import dbCreateListing from "../services/listingService.js"

const listingController = {
	createListing: async (req, res) => {

		try {
			const result = await dbCreateListing(req.body)
			res.status(result.status).json(result)
		} catch (err) {
			res.status(err.status).json({code:err.status, message:err.message})
		}
	},
};

export default listingController;
