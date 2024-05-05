import * as dotenv from "dotenv";
import { BaseError as SequelizeGenericError, Op } from "sequelize";
import sequelize, { Model } from "../../../sequelize/index.js";
import { DatabaseError, UnknownError } from "../../utils/api_error.js";

dotenv.config();

export default async function GetAllChatroom(req, res) {
	const chatrooms = Model.Chatrooms;
	const messages = Model.Messages;

	const { tab } = req.query;

	const jwtUsername = res.locals.user;

	try {
		const result = await sequelize.transaction(async (t) => {
			let whereClause = {};
			if (!tab) {
				whereClause = { [Op.or]: [{ seller_name: jwtUsername }, { buyer_name: jwtUsername }] };
			} else {
				whereClause[tab === "sell" ? "seller_name" : "buyer_name"] = jwtUsername;
			}

			const message = await chatrooms.findAll(
				{
					attributes: {
						exclude: ["created_at"],
					},
					where: whereClause,
					include: {
						model: messages,
						as: "chatroomsLastMessage",
						attributes: ["read_at", "text"],
					},
					order: [["updated_at", "DESC"]],
				},
				{ transaction: t },
			);

			return message;
		});

		const transformedResult = result.map((item) => {
			const { dataValues } = item;
			const { chatroomsLastMessage, ...rest } = dataValues;
			return {
				...rest,
				text: chatroomsLastMessage.text,
				read_at: chatroomsLastMessage.read_at,
			};
		});

		return transformedResult;
	} catch (err) {
		console.log(err);
		if (err instanceof SequelizeGenericError) {
			throw new DatabaseError(err.name);
		}
		throw new UnknownError();
	}
}
