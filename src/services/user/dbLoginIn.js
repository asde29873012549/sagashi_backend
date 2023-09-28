import * as dotenv from "dotenv";
import bcrypt from "bcrypt";
import { BaseError as SequelizeGenericError } from "sequelize";
import sequelize, { Model } from "../../../sequelize/index.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/tokenGenerator.js";
import {
	DatabaseError,
	NotFoundError,
	UnknownError,
	ForbiddenError,
} from "../../utils/api_error.js";

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

			if (!user) throw new NotFoundError();

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) throw new ForbiddenError();

			const { accessToken, accessTokenExpireTime } = generateAccessToken(username);
			const { refreshToken, refreshTokenExpireTime } = generateRefreshToken(username);

			return {
				username,
				avatar: user.avatar,
				accessToken,
				refreshToken,
				accessTokenExpireTime,
				refreshTokenExpireTime,
			};
		});

		return result;
	} catch (err) {
		if (err instanceof NotFoundError || err instanceof ForbiddenError) {
			throw err;
		} else if (err instanceof SequelizeGenericError) {
			throw new DatabaseError(err.name);
		}
		throw new UnknownError();
	}
}
