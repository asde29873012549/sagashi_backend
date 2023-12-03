import * as dotenv from "dotenv";
import { BaseError as SequelizeGenericError } from "sequelize";
import sequelize, { Model } from "../../../sequelize/index.js";
import { DatabaseError, UnknownError } from "../../utils/api_error.js";

dotenv.config();

export default async function dbGetMessage(req) {
	const messages = Model.Messages;

	const { chatroom_id } = req.params;

	try {
		const result = await sequelize.transaction(async (t) => {
			const message = await messages.findAll(
				{
					where: {
						chatroom_id,
					},
					order: [["created_at", "ASC"]],
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
}
