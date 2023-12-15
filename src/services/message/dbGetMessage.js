import * as dotenv from "dotenv";
import { BaseError as SequelizeGenericError, Op } from "sequelize";
import sequelize, { Model } from "../../../sequelize/index.js";
import { DatabaseError, UnknownError } from "../../utils/api_error.js";

dotenv.config();

export default async function dbGetMessage(req) {
	const messages = Model.Messages;

	const { cursor } = req.query;
	const { chatroom_id } = req.params;

	try {
		const result = await sequelize.transaction(async (t) => {
			const whereClause = cursor
				? {
						chatroom_id,
						id: {
							[Op.lt]: cursor,
						},
				  }
				: { chatroom_id };
			const message = await messages.findAll(
				{
					limit: 30,
					attributes: ["id", "sender_name", "text", "created_at"],
					where: whereClause,
					order: [["created_at", "DESC"]],
				},
				{ transaction: t },
			);

			return message;
		});

		return result;
	} catch (err) {
		console.log(err);
		if (err instanceof SequelizeGenericError) {
			throw new DatabaseError(err.name);
		}
		throw new UnknownError();
	}
}
