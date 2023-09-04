import * as dotenv from "dotenv";
import sequelize, { Model } from "../../../sequelize/index.js";
import { DatabaseError } from "../../utils/api_error.js";

dotenv.config();

export default async function dbGetListingDraft(req) {
	const products = Model.Products;

	const { username } = req.params;

	try {
		const result = await sequelize.transaction(async (t) => {
			const draft_listing = await products.findAll(
				{
					where: {
						seller_name: username,
						status: 0,
					},
				},
				{ transaction: t },
			);

			return draft_listing;
		});

		console.log(result);

		if (!result) {
			throw new DatabaseError();
		} else {
			return result;
		}
	} catch (err) {
		console.log(err);
		throw new DatabaseError();
	}
}
