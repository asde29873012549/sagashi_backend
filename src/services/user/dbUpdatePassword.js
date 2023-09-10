import * as dotenv from "dotenv";
import bcrypt from "bcrypt";
import { BaseError as SequelizeGenericError } from "sequelize";
import sequelize, { Model } from "../../../sequelize/index.js";
import {
	DatabaseError,
	NotFoundError,
	ForbiddenError,
	UnknownError,
} from "../../utils/api_error.js";

dotenv.config();

export default async function dbUpdatePassword(req, res) {
	const users = Model.Users;

	const { username, oldPassword, newPassword } = req.body;

	const jwtUsername = res.locals.user;

	if (username !== jwtUsername) throw new ForbiddenError();

	try {
		const result = await sequelize.transaction(async (t) => {
			const user = await users.findOne(
				{
					where: {
						username,
					},
				},
				{ transaction: t },
			);

			if (user) {
				bcrypt.compare(oldPassword, user.password, (err, isSuccess) => {
					if (err || !isSuccess) throw new NotFoundError();
					users.update(
						{
							password: newPassword,
						},
						{
							where: {
								username,
							},
						},
						{ transaction: t },
					);
				});
			} else {
				throw new NotFoundError();
			}
		});

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
