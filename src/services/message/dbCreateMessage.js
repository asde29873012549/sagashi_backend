import * as dotenv from "dotenv";
import { BaseError as SequelizeGenericError } from "sequelize";
import sequelize, { Model } from "../../../sequelize/index.js";
import { formatDateTime } from "../../utils/date.js";
import { DatabaseError, UnknownError, ForbiddenError } from "../../utils/api_error.js";

dotenv.config();

export default async function dbCreateMessage(req, res) {
	const messages = Model.Messages;
	const chatrooms = Model.Chatrooms;

	const { product_id, seller_name, buyer_name, sender_name, chatroom_id, text, isRead } = req.body;

	const jwtUsername = res.locals.user;

	if (sender_name !== jwtUsername) throw new ForbiddenError();

	if (!chatroom_id) {
		const new_chatroom_id = `${product_id}-${seller_name}-${buyer_name}`;
		try {
			const result = await sequelize.transaction(async (t) => {
				await chatrooms.create(
					{
						id: new_chatroom_id,
						seller_name,
						buyer_name,
						last_sent_user_name: sender_name,
						last_message: text,
					},
					{ transaction: t },
				);

				const message = await messages.create(
					{
						sender_name,
						chatroom_id: new_chatroom_id,
						text,
						read_at: isRead ? formatDateTime() : null,
					},
					{ transaction: t },
				);

				return message;
			});

			return result;
		} catch (err) {
			if (err instanceof SequelizeGenericError) {
				throw new DatabaseError(err.name);
			}
			throw new UnknownError();
		}
	} else {
		try {
			const result = await sequelize.transaction(async (t) => {
				const message = await messages.create(
					{
						sender_name,
						chatroom_id,
						text,
						read_at: isRead ? formatDateTime() : null,
					},
					{ transaction: t },
				);

				const updatedRow = await chatrooms.update(
					{
						last_sent_user_name: sender_name,
						last_message: text,
					},
					{
						where: {
							id: chatroom_id,
						},
					},
				);

				return [message, updatedRow];
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
}
