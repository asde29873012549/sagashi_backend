import * as dotenv from "dotenv";
import bcrypt from "bcrypt";
import { BaseError as SequelizeGenericError } from "sequelize";
import sequelize, { Model } from "../../../sequelize/index.js";
import {
	DatabaseError,
	ConflictError,
	UnknownError,
	ForbiddenError,
} from "../../utils/api_error.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/tokenGenerator.js";

// import passport from "passport";
// import { Strategy, ExtractJwt } from "passport-jwt";
/* const opts = {
		secretOrKey: accesss_token_secret,
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
	}

	passport.use( new Strategy(opts, (jwt_payload, done) => {

	})) */

dotenv.config();

export default async function dbRegister(req) {
	const users = Model.Users;
	const salt = 10;

	// regular crendential Login
	const { username, password } = req.body;

	// Google Login
	const { avatar, name, email, locale } = req.body;

	if (!username && !email) throw new ForbiddenError();

	try {
		const hashedPassword = password
			? await bcrypt.hash(password, salt)
			: await bcrypt.hash(email, salt);

		const result = await sequelize.transaction(async (t) => {
			const [user, created] = await users.findOrCreate({
				defaults: {
					username: username || email,
					password: hashedPassword,
					avatar: avatar || null,
					fullname: name || null,
					email: email || null,
					country: locale || null,
				},
				where: { username: username || email },
				transaction: t,
			});

			// if its google login, i want to return user no matter if its first time register or already exists.
			if (user && email) return user;

			// if its credential login, i want to check if the user already exists.
			if (!created) throw new ConflictError();

			return user;
		});

		const { accessToken, accessTokenExpireTime } = generateAccessToken(username || email);
		const { refreshToken, refreshTokenExpireTime } = generateRefreshToken(username || email);

		return {
			username: result.username,
			avatar: result?.avatar,
			accessToken,
			refreshToken,
			accessTokenExpireTime,
			refreshTokenExpireTime,
		};
	} catch (err) {
		if (err instanceof ConflictError) {
			throw err;
		} else if (err instanceof SequelizeGenericError) {
			throw new DatabaseError(err.name);
		}
		throw new UnknownError();
	}
}
