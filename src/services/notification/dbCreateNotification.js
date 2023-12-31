import * as dotenv from "dotenv";
import { BaseError as SequelizeGenericError } from "sequelize";
import sequelize, { Model } from "../../../sequelize/index.js";
import { DatabaseError, UnknownError, ForbiddenError } from "../../utils/api_error.js";

dotenv.config();

export default async function dbCreateNotification(req, res) {
	const notification = Model.Notifications;

	const { receiver_name, type, link, image, content } = req.body;
	const jwtUsername = res.locals.user;

	try {
		const result = await sequelize.transaction(async (t) => {
			const notifications = await notification.create(
				{
					sender_name: jwtUsername,
					receiver_name,
					type,
					image,
					content,
					link,
				},
				{ transaction: t },
			);

			return notifications;
		});

		return result;
	} catch (err) {
		console.log(err);
		if (err instanceof ForbiddenError) {
			throw err;
		} else if (err instanceof SequelizeGenericError) {
			throw new DatabaseError(err.name);
		}
		throw new UnknownError();
	}
}
