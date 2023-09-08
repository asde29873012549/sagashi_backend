import * as dotenv from "dotenv";
import sequelize, { Model } from "../../../sequelize/index.js";
import { DatabaseError, NotFoundError } from "../../utils/api_error.js";

dotenv.config();

export default async function dbGetUser(req) {
	const users = Model.Users;

	const { username } = req.params;

	try {
		const result = await sequelize.transaction(async (t) => {
			const user = await users.findOne(
				{
					where: {
						username,
					},
				},
				{ transaction: t },
			);

			return user;
		});

		if (!result) throw new NotFoundError();
		return result;
	} catch (err) {
		console.log(err);
		throw new DatabaseError();
	}
}
