import * as dotenv from "dotenv";
import { BaseError as SequelizeGenericError } from "sequelize";
import sequelize, { Model } from "../../../sequelize/index.js";
import { DatabaseError, UnknownError } from "../../utils/api_error.js";

dotenv.config();

export default async function dbGetUserLikeListing(req, res) {
	const likes = Model.Likes;

	const jwtUsername = res.locals.user;

	try {
		const result = await sequelize.transaction(async (t) => {
			const liked_listing = await likes.findAll(
				{
					attributes: ["product_id"],
					where: {
						user_name: jwtUsername,
					},
				},
				{ transaction: t },
			);

			return liked_listing;
		});

		return result;
	} catch (err) {
		if (err instanceof SequelizeGenericError) {
			throw new DatabaseError(err.name);
		}
		throw new UnknownError();
	}
}
