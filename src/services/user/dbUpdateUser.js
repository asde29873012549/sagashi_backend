import * as dotenv from "dotenv";
import sequelize, { Model } from "../../../sequelize/index.js";
import { DatabaseError, NotFoundError } from "../../utils/api_error.js";

dotenv.config();

export default async function dbUpdateUser(req) {
	const users = Model.Users;

	const {
		username,
		avatar,
		email,
		birth_date,
		gender,
		shipping_address,
		language,
		country,
		fullname,
	} = req.body;

	try {
		const result = await sequelize.transaction(async (t) => {
			const user = await users.update(
				{
					username,
					avatar,
					email,
					birth_date,
					gender,
					shipping_address,
					language,
					country,
					fullname,
				},
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
