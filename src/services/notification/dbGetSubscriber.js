import * as dotenv from "dotenv";
import { BaseError as SequelizeGenericError } from "sequelize";
import sequelize, { Model } from "../../../sequelize/index.js";
import { DatabaseError, UnknownError } from "../../utils/api_error.js";

dotenv.config();

export default async function dbGetSubscriber(req, res) {
	const follows = Model.Follows;
	// const users = Model.Users;

	const jwtUsername = res.locals.user;

	try {
		const result = await sequelize.transaction(async (t) => {
			const followed_users = await follows.findAll(
				{
					attributes: ["user_name"],
					where: {
						follower_name: jwtUsername,
					},
					/* include: {
					model: users,
					require: true,
					attributes: ["avatar"]
				} */
				},
				{ transaction: t },
			);

			/* const subscribedTopics = {
				followed_users
			} */

			return followed_users; // subscribedTopics;
		});

		return result;
	} catch (err) {
		if (err instanceof SequelizeGenericError) {
			throw new DatabaseError(err.name);
		}
		throw new UnknownError();
	}
}
