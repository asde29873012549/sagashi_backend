import * as dotenv from "dotenv";
import { BaseError as SequelizeGenericError } from "sequelize";
import sequelize, { Model } from "../../../sequelize/index.js";
import {
	DatabaseError,
	NotFoundError,
	ForbiddenError,
	UnknownError,
} from "../../utils/api_error.js";

dotenv.config();

export default async function dbUpdateUser(req, res) {
	const users = Model.Users;

	const {
		username,
		avatar,
		email,
		birth_date,
		gender,
		shipping_address,
		language,
		country,
		fullname,
	} = req.body;

	const jwtUsername = res.locals.user;

	if (username !== jwtUsername) throw new ForbiddenError();

	try {
		const result = await sequelize.transaction(async (t) => {
			const user = await users.update(
				{
					username,
					avatar,
					email,
					birth_date,
					gender,
					shipping_address,
					language,
					country,
					fullname,
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

		if (!result) throw new NotFoundError();
		return result;
	} catch (err) {
		if (err instanceof NotFoundError || err instanceof ForbiddenError) {
			throw err;
		} else if (err instanceof SequelizeGenericError) {
			throw new DatabaseError(err.name);
		}
		throw new UnknownError();
	}
}
