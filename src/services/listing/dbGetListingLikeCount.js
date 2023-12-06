import * as dotenv from "dotenv";
import { BaseError as SequelizeGenericError } from "sequelize";
import sequelize, { Model } from "../../../sequelize/index.js";
import { DatabaseError, ValidationError, UnknownError } from "../../utils/api_error.js";

dotenv.config();

export default async function dbGetListingLikeCount(req) {
	const likes = Model.Likes;

	const { listing_id } = req.params;

	const numeric_listing_id = Number(listing_id);
	if (Number.isNaN(numeric_listing_id)) {
		throw new ValidationError();
	}

	try {
		const result = await sequelize.transaction(async (t) => {
			const { count } = await likes.findAndCountAll(
				{
					where: {
						product_id: numeric_listing_id,
					},
				},
				{ transaction: t },
			);

			return count;
		});

		return result;
	} catch (err) {
		if (err instanceof ValidationError) {
			throw err;
		} else if (err instanceof SequelizeGenericError) {
			throw new DatabaseError(err.name);
		}
		throw new UnknownError();
	}
}
