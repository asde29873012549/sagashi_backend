import * as dotenv from "dotenv";
import { BaseError as SequelizeGenericError } from "sequelize";
import sequelize, { Model } from "../../../sequelize/index.js";
import { DatabaseError, UnknownError } from "../../utils/api_error.js";

dotenv.config();

export default async function dbGetUserLikeListing(req) {
	const likes = Model.Likes;

	const { username } = req.params;

	try {
		const result = await sequelize.transaction(async (t) => {
			const liked_listing = await likes.findAll(
				{
					where: {
						user_name: username,
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
