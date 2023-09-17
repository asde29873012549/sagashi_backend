import * as dotenv from "dotenv";
import { BaseError as SequelizeGenericError } from "sequelize";
import sequelize, { Model } from "../../../sequelize/index.js";
import { formatDateTime } from "../../utils/date.js";
import { DatabaseError, UnknownError, ForbiddenError } from "../../utils/api_error.js";

dotenv.config();

export default async function dbReadNotification(req, res) {
	const notifications = Model.Notifications;

	const { notificationsRead } = req.body;

	const jwtUsername = res.locals.user;

	if (!jwtUsername) throw new ForbiddenError();

	try {
		const result = await sequelize.transaction(async (t) => {
			const message = await notifications.update(
				{
					read_at: formatDateTime(),
				},
				{
					where: {
						id: [...notificationsRead],
					},
				},
				{ transaction: t },
			);

			return message;
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
