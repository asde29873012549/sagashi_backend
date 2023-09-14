import * as dotenv from "dotenv";
import { BaseError as SequelizeGenericError } from "sequelize";
import sequelize, { Model } from "../../../sequelize/index.js";
import { DatabaseError, UnknownError, ForbiddenError } from "../../utils/api_error.js";

dotenv.config();

export default async function dbGetNotification(req, res) {
	const notification = Model.Notifications;

	const { username } = req.params;

	const jwtUsername = res.locals.user;

	if (username !== jwtUsername) throw new ForbiddenError();

	try {
		const result = await sequelize.transaction(async (t) => {
			const notifications = await notification.findAll(
				{
					where: {
						receiver_name: username,
					},
				},
				{ transaction: t },
			);

			return notifications;
		});

		return result;
	} catch (err) {
		if (err instanceof ForbiddenError) {
			throw err;
		} else if (err instanceof SequelizeGenericError) {
			throw new DatabaseError(err.name);
		}
		throw new UnknownError();
	}
}
