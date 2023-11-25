import * as dotenv from "dotenv";
import { BaseError as SequelizeGenericError } from "sequelize";
import sequelize, { Model } from "../../../sequelize/index.js";
import { DatabaseError, NotFoundError, UnknownError } from "../../utils/api_error.js";

dotenv.config();

export default async function dbGetUserInfo(req) {
	const users = Model.Users;

	const { username } = req.params;

	try {
		const result = await sequelize.transaction(async (t) => {
			const user = await users.findOne(
				{
					where: {
						username,
					},
					attributes: [
						"username",
						"avatar",
						"country",
						"created_at",
						// Subquery to count the followers
						[
							sequelize.literal(`(
						SELECT COUNT(*)
						FROM "sagashi"."Follows" AS "Follows"
						WHERE
						  "Follows"."user_name" = "Users"."username"
					  )`),
							"follower_count",
						],
					],
					// No need to group in the main query when using a subquery for count
					// The include is not necessary since we handle counting in the attributes now
				},
				{ transaction: t },
			);

			return user;
		});

		if (!result.username) throw new NotFoundError();
		return result;
	} catch (err) {
		if (err instanceof NotFoundError) {
			throw err;
		} else if (err instanceof SequelizeGenericError) {
			throw new DatabaseError(err.name);
		}
		throw new UnknownError();
	}
}
