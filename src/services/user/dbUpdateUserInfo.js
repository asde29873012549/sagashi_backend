import * as dotenv from "dotenv";
import { BaseError as SequelizeGenericError } from "sequelize";
import sequelize, { Model } from "../../../sequelize/index.js";
import {
	DatabaseError,
	NotFoundError,
	ForbiddenError,
	UnknownError,
	ValidationError,
} from "../../utils/api_error.js";

dotenv.config();

export default async function dbUpdateUserInfo(req, res) {
	const users = Model.Users;
	const upDateObj = {};

	const validFields = [
		"username",
		"avatar",
		"email",
		"birth_date",
		"gender",
		"shipping_address",
		"language",
		"country",
		"fullname",
	];

	const jwtUsername = res.locals.user;

	try {
		Object.keys(req.body).forEach((key) => {
			if (!validFields.includes(key)) throw new ValidationError();
			if (req.body[key]) upDateObj[key] = req.body[key];
		});

		const result = await sequelize.transaction(async (t) => {
			const user = await users.update(
				upDateObj,
				{
					where: {
						username: jwtUsername,
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
