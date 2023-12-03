import * as dotenv from "dotenv";
import { BaseError as SequelizeGenericError } from "sequelize";
import sequelize, { Model } from "../../../sequelize/index.js";
import { formatDateTime, getNowISODate } from "../../utils/date.js";
import { DatabaseError, UnknownError } from "../../utils/api_error.js";

import publish_notification from "../../../rabbitmq/notification_service/publisher.js";

dotenv.config();

export default async function dbCreateMessage(req, res) {
	const messages = Model.Messages;
	const chatrooms = Model.Chatrooms;

	const { product_id, seller_name, buyer_name, isFirstMessage, image, text, isRead } = req.body;

	const jwtUsername = res.locals.user;

	const chatroom_id = `${product_id}-${seller_name}-${buyer_name}`;

	let result;

	if (isFirstMessage) {
		try {
			console.log("send message to new chatroom");
			result = await sequelize.transaction(async (t) => {
				await chatrooms.upsert(
					{
						id: chatroom_id,
						seller_name,
						buyer_name,
						last_sent_user_name: jwtUsername,
						chatroom_avatar: image,
						link: `/user?dept=Messages&chatroom_id=${chatroom_id}`,
					},
					{ transaction: t },
				);

				const message = await messages.create(
					{
						sender_name: jwtUsername,
						chatroom_id,
						text,
						read_at: isRead ? formatDateTime() : null,
					},
					{ transaction: t },
				);

				return message;
			});

			if (!result.id) throw new SequelizeGenericError("message not created, id not found");

			await chatrooms.update(
				{
					last_message: result.id,
				},
				{
					where: {
						id: result.chatroom_id,
					},
				},
			);
		} catch (err) {
			if (err instanceof SequelizeGenericError) {
				throw new DatabaseError(err.name);
			}
			throw new UnknownError();
		}
	} else {
		try {
			console.log("send message to chatroom already created");
			const message = await messages.create({
				sender_name: jwtUsername,
				chatroom_id,
				text,
				read_at: isRead ? formatDateTime() : null,
			});

			if (!message.id) throw new SequelizeGenericError("message not created, id not found");

			const updatedRow = await chatrooms.update(
				{
					last_sent_user_name: jwtUsername,
					last_message: message.id,
				},
				{
					where: {
						id: chatroom_id,
					},
				},
			);

			result = [message, updatedRow];
		} catch (err) {
			if (err instanceof SequelizeGenericError) {
				throw new DatabaseError(err.name);
			}
			throw new UnknownError();
		}
	}

	if (result) {
		await publish_notification({
			type: "notification.message",
			sender_name: jwtUsername,
			buyer_name,
			seller_name,
			listing_id: product_id,
			text,
			image,
			created_at: getNowISODate(),
			link: `/user?dept=Messages&chatroom_id=${chatroom_id}`,
		});
	}

	return result;
}
