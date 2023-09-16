import * as dotenv from "dotenv";
import { BaseError as SequelizeGenericError } from "sequelize";
import sequelize, { Model } from "../../../sequelize/index.js";
import { formatDateTime } from "../../utils/date.js";
import { DatabaseError, UnknownError, ForbiddenError } from "../../utils/api_error.js";

dotenv.config();

export default async function dbCreateNotification(req, res) {
	const notification = Model.Notifications;

	const { sender_name, receiver_name, message, link, isRead } = req.body;

	const jwtUsername = res.locals.user;

	if (sender_name !== jwtUsername) throw new ForbiddenError();

	try {
		const result = await sequelize.transaction(async (t) => {
			const notifications = await notification.create(
				{
					sender_name,
					receiver_name,
					message,
					link,
					read_at: isRead ? formatDateTime(Date.now()) : null,
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
