import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const access_token_secret = process.env.ACCESS_TOKEN_SECRET;
const refresh_token_secret = process.env.REFRESH_TOKEN_SECRET;

const generateAccessToken = (username) => {
	const accessTokenExpireTime = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7; // 7 days
	return {
		accessToken: jwt.sign({ username, exp: accessTokenExpireTime }, access_token_secret),
		accessTokenExpireTime,
	};
};

const generateRefreshToken = (username) => {
	const refreshTokenExpireTime = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30; // 30 days
	return {
		refreshToken: jwt.sign({ username, exp: refreshTokenExpireTime }, refresh_token_secret),
		refreshTokenExpireTime,
	};
};
export { generateAccessToken, generateRefreshToken };
