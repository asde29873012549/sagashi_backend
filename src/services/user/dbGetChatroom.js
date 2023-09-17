import * as dotenv from "dotenv";
import { BaseError as SequelizeGenericError, Op } from "sequelize";
import sequelize, { Model } from "../../../sequelize/index.js";
import { formatDateTime } from "../../utils/date.js";
import { DatabaseError, UnknownError, ForbiddenError } from "../../utils/api_error.js";

dotenv.config();

export default async function dbGetChatroom(req, res) {
	const chatrooms = Model.Chatrooms;

	const { username } = req.params;
	const jwtUsername = res.locals.user;

	const { cursor } = req.query;

	if (username !== jwtUsername) throw new ForbiddenError();

	try {
		const result = await sequelize.transaction(async (t) => {
			const allChatrooms = await chatrooms.findAll(
				{
					where: {
						created_at: {
							[Op.lt]: cursor || formatDateTime(),
						},
						[Op.or]: [{ seller_name: jwtUsername }, { buyer_name: jwtUsername }],
					},
					limit: 10,
					order: [["updated_at", "DESC"]],
				},
				{ transaction: t },
			);

			return allChatrooms;
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
