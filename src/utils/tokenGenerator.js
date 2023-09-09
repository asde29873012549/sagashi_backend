import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const access_token_secret = process.env.ACCESS_TOKEN_SECRET;
const refresh_token_secret = process.env.REFRESH_TOKEN_SECRET;

const generateAccessToken = (username) =>
	jwt.sign({ username }, access_token_secret, { expiresIn: "4h" });

const generateRefreshToken = (username) =>
	jwt.sign({ username }, refresh_token_secret, { expiresIn: "24h" });

export { generateAccessToken, generateRefreshToken };
