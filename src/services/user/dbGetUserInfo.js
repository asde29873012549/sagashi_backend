import * as dotenv from "dotenv";
import { BaseError as SequelizeGenericError } from "sequelize";
import sequelize, { Model } from "../../../sequelize/index.js";
import {
	DatabaseError,
	NotFoundError,
	UnknownError,
	ForbiddenError,
} from "../../utils/api_error.js";

dotenv.config();

export default async function dbGetUserInfo(req, res) {
	const users = Model.Users;

	const { username } = req.params;

	const jwtUsername = res.locals.user;

	if (username !== jwtUsername) throw new ForbiddenError();

	try {
		const result = await sequelize.transaction(async (t) => {
			const user = await users.findOne(
				{
					where: {
						username,
					},
					attributes: [
						"username",
						"fullname",
						"email",
						"avatar",
						"birth_date",
						"gender",
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
				},
				{ transaction: t },
			);

			return user;
		});

		if (!result.username) throw new NotFoundError();
		return result;
	} catch (err) {
		if (err instanceof ForbiddenError || err instanceof NotFoundError) {
			throw err;
		} else if (err instanceof SequelizeGenericError) {
			throw new DatabaseError(err.name);
		}
		throw new UnknownError();
	}
}
