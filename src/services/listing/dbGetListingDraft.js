import * as dotenv from "dotenv";
import { BaseError as SequelizeGenericError } from "sequelize";
import sequelize, { Model } from "../../../sequelize/index.js";
import { DatabaseError, UnknownError, ForbiddenError } from "../../utils/api_error.js";

dotenv.config();

export default async function dbGetListingDraft(req, res) {
	const products = Model.Products;
	const sizes = Model.Sizes;

	const { username } = req.params;

	const jwtUsername = res.locals.user;

	if (username !== jwtUsername) throw new ForbiddenError();

	try {
		const result = await sequelize.transaction(async (t) => {
			const draft_listing = await products.findAll(
				{
					include: {
						attributes: ["name"],
						model: sizes,
						require: true,
					},
					where: {
						seller_name: username,
						status: "0",
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
