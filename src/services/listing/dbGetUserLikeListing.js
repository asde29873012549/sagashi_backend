import * as dotenv from "dotenv";
import sequelize, { Model } from "../../../sequelize/index.js";
import { DatabaseError } from "../../utils/api_error.js";

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
