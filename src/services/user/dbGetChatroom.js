import * as dotenv from "dotenv";
import { Op } from "sequelize";
import sequelize, { Model } from "../../../sequelize/index.js";
import { DatabaseError, NotFoundError, ForbiddenError } from "../../utils/api_error.js";

dotenv.config();

export default async function dbGetChatroom(req, res) {
	const chatrooms = Model.Chatrooms;

	const paramsUsername = req.params.username;
	const jwtUsername = res.locals.user;

	if (paramsUsername !== jwtUsername) throw new ForbiddenError();

	try {
		const result = await sequelize.transaction(async (t) => {
			const allChatrooms = await chatrooms.findAll(
				{
					where: {
						[Op.or]: [{ seller_name: jwtUsername }, { buyer_name: jwtUsername }],
					},
				},
				{ transaction: t },
			);

			if (!allChatrooms) throw new NotFoundError();

			return allChatrooms;
		});

		return result;
	} catch (err) {
		if (err instanceof NotFoundError) {
			throw err;
		}
		console.log(err);
		throw new DatabaseError();
	}
}
