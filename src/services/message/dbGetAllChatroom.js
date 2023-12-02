import * as dotenv from "dotenv";
import { BaseError as SequelizeGenericError, Op } from "sequelize";
import sequelize, { Model } from "../../../sequelize/index.js";
import { DatabaseError, UnknownError } from "../../utils/api_error.js";

dotenv.config();

export default async function GetAllChatroom(req, res) {
	const chatrooms = Model.Chatrooms;

	const { tab } = req.query;

	const jwtUsername = res.locals.user;

	try {
		const result = await sequelize.transaction(async (t) => {
			let whereClause = {};
			if (!tab) {
				whereClause = { [Op.or] : [{ seller_name: jwtUsername }, { buyer_name: jwtUsername }]};
			} else {
				whereClause[tab === "sell" ? "seller_name" : "buyer_name"] = jwtUsername;
			}

			const message = await chatrooms.findAll(
				{
					where: whereClause
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
