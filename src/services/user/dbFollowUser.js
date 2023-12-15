import * as dotenv from "dotenv";
import { BaseError as SequelizeGenericError } from "sequelize";
import sequelize, { Model } from "../../../sequelize/index.js";
import {
	DatabaseError,
	NotFoundError,
	UnknownError,
	ForbiddenError,
} from "../../utils/api_error.js";
import publish_notification from "../../../rabbitmq/notification_service/publisher.js";
import { getNowISODate } from "../../utils/date.js";

dotenv.config();

export default async function dbFollowUser(req, res) {
	const follows = Model.Follows;
	const notification = Model.Notifications;
	let isCreateFollow = false;

	const { follow_user, user_image } = req.body;

	const jwtUsername = res.locals.user;

	try {
		const result = await sequelize.transaction(async (t) => {
			const rows_deleted = await follows.destroy(
				{
					where: {
						user_name: follow_user,
						follower_name: jwtUsername,
					},
				},
				{ transaction: t },
			);

			if (rows_deleted === 0) {
				const created = await follows.create(
					{
						user_name: follow_user,
						follower_name: jwtUsername,
					},
					{ transaction: t },
				);

				isCreateFollow = true;

				return created;
			}

			return rows_deleted;
		});

		if (isCreateFollow) {
			const notifications = await notification.create({
				sender_name: jwtUsername,
				receiver_name: follow_user,
				type: "notification.follow",
				image: user_image,
				content: {
					username: jwtUsername,
				},
				link: `/user/public/${jwtUsername}`,
			});

			if (notifications) {
				await publish_notification({
					id: notifications.id,
					type: "notification.follow",
					username: jwtUsername,
					followed_user: follow_user,
					image: user_image,
					created_at: getNowISODate(),
					link: `/user/public/${jwtUsername}`,
				});
			}
		}

		return result;
	} catch (err) {
		console.log(err);
		if (err instanceof ForbiddenError || err instanceof NotFoundError) {
			throw err;
		} else if (err instanceof SequelizeGenericError) {
			throw new DatabaseError(err.name);
		}
		throw new UnknownError();
	}
}
