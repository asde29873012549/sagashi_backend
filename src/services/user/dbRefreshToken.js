import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";

import { generateAccessToken } from "../../utils/tokenGenerator.js";
import { UnknownError, UnauthorizedError } from "../../utils/api_error.js";

dotenv.config();

export default async function dbRefreshToken(req) {
	const { token } = req.body;

	if (!token) throw new UnauthorizedError();

	const { refreshToken, refreshTokenExpireTime } = token;

	try {
		const verified = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

		if (!verified) throw new UnauthorizedError();

		const { accessToken, accessTokenExpireTime } = generateAccessToken(verified.username);
		const newToken = {
			username: verified.username,
			avatar: verified.avatar,
			accessToken,
			accessTokenExpireTime,
			refreshToken,
			refreshTokenExpireTime,
		};

		return newToken;
	} catch (err) {
		if (err instanceof UnauthorizedError) {
			throw err;
		}
		throw new UnknownError(err);
	}
}
