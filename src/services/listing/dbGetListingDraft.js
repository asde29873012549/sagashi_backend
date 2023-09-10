import * as dotenv from "dotenv";
import { BaseError as SequelizeGenericError } from "sequelize";
import sequelize, { Model } from "../../../sequelize/index.js";
import { DatabaseError, UnknownError } from "../../utils/api_error.js";

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

		return result;
	} catch (err) {
		if (err instanceof SequelizeGenericError) {
			throw new DatabaseError(err.name);
		}
		throw new UnknownError();
	}
}
