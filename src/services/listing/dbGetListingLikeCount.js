import * as dotenv from "dotenv";
import sequelize, { Model } from "../../../sequelize/index.js";
import { DatabaseError, ValidationError } from "../../utils/api_error.js";

dotenv.config();

export default async function dbGetListingLikeCount(req) {
	const likes = Model.Likes;

	const { listing_id } = req.query;

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
