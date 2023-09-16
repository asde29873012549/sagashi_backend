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

export default async function dbSubscribe(req, res) {
	const users = Model.Users;

	const { username } = req.params;

	const jwtUsername = res.locals.user;

	if (username !== jwtUsername) throw new ForbiddenError();

	try {
		const result = await sequelize.transaction(async (t) => {
			const user = await users.update(
				{
					subscribe:"1"
				},
				{
					where: {
						username,
					},
				},
				{ transaction: t },
			);

			return user;
		});

		if (!result) throw new NotFoundError()

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
