import * as dotenv from "dotenv";
import { BaseError as SequelizeGenericError } from "sequelize";
import sequelize, { Model } from "../../../sequelize/index.js";
import { DatabaseError, UnknownError } from "../../utils/api_error.js";

dotenv.config();

export default async function dbLikeListing(req) {
	const likes = Model.Likes;

	const { username, listing_id } = req.body;

	try {
		const result = await sequelize.transaction(async (t) => {
			const rows_deleted = await likes.destroy(
				{
					where: {
						user_name: username,
						product_id: listing_id,
					},
				},
				{ transaction: t },
			);

			if (rows_deleted === 0) {
				const created = await likes.create(
					{
						user_name: "noah",
						product_id: listing_id,
					},
					{ transaction: t },
				);

				return created;
			}

			return rows_deleted;
		});

		return result;
	} catch (err) {
		if (err instanceof SequelizeGenericError) {
			throw new DatabaseError(err.name);
		}
		throw new UnknownError();
	}
}
