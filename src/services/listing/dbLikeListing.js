import * as dotenv from "dotenv";
import { BaseError as SequelizeGenericError } from "sequelize";
import sequelize, { Model } from "../../../sequelize/index.js";
import { DatabaseError, UnknownError } from "../../utils/api_error.js";
import { getNowISODate } from "../../utils/date.js";

import publish_notification from "../../../rabbitmq/notification_service/publisher.js";

dotenv.config();

export default async function dbLikeListing(req, res) {
	const likes = Model.Likes;
	const notification = Model.Notifications;
	const notificationReceiverMap = Model.NotificationReceiverMap;

	let id = null;

	const { listing_id, listing_name, seller_name, listing_image } = req.body;

	const jwtUsername = res.locals.user;

	try {
		const result = await sequelize.transaction(async (t) => {
			const rows_deleted = await likes.destroy(
				{
					where: {
						user_name: jwtUsername,
						product_id: listing_id,
					},
				},
				{ transaction: t },
			);

			if (rows_deleted !== 0) return rows_deleted;

			await likes.create(
				{
					user_name: jwtUsername,
					product_id: listing_id,
				},
				{ transaction: t },
			);

			const notifications = await notification.create({
				sender_name: jwtUsername,
				type: "notification.like",
				image: listing_image,
				content: {
					listing_name,
				},
				link: `/shop/${listing_id}`,
			});

			if (notifications) id = notifications.id;

			await notificationReceiverMap.create(
				{
					notification_id: id,
					username: seller_name,
				},
				{ transaction: t },
			);

			if (notifications) {
				await publish_notification({
					id,
					type: "notification.like",
					username: jwtUsername,
					seller_name,
					listing_id,
					listing_name,
					image: listing_image,
					created_at: getNowISODate(),
					link: `/shop/${listing_id}`,
				});
			}

			return notifications;
		});

		return result;
	} catch (err) {
		if (err instanceof SequelizeGenericError) {
			throw new DatabaseError(err.name);
		}
		throw new UnknownError();
	}
}
