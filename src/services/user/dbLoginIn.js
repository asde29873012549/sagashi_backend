import * as dotenv from "dotenv";
import bcrypt from "bcrypt";
import sequelize, { Model } from "../../../sequelize/index.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/tokenGenerator.js";
import { DatabaseError, NotFoundError } from "../../utils/api_error.js";

dotenv.config();

export default async function dbLoginIn(req) {
	const users = Model.Users;

	const { username, password } = req.body;

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

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) throw new NotFoundError();

			const accessToken = generateAccessToken(username);
			const refreshToken = generateRefreshToken(username);

			return {
				username,
				accessToken,
				refreshToken,
			};
		});

		return result;
	} catch (err) {
		if (err instanceof NotFoundError) {
			throw err;
		}
		throw new DatabaseError();
	}
}
