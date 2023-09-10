import * as dotenv from "dotenv";
import bcrypt from "bcrypt";
import { BaseError as SequelizeGenericError } from "sequelize";
import sequelize, { Model } from "../../../sequelize/index.js";
import { DatabaseError, ConflictError, UnknownError } from "../../utils/api_error.js";
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

	const { username, password } = req.body;

	try {
		const hashedPassword = await bcrypt.hash(password, salt);

		const result = await sequelize.transaction(async (t) => {
			const [user, created] = await users.findOrCreate({
				defaults: {
					username,
					password: hashedPassword,
				},
				where: { username },
				transaction: t,
			});

			if (!created) throw new ConflictError();

			return user;
		});

		return result;
	} catch (err) {
		if (err instanceof ConflictError) {
			throw err;
		} else if (err instanceof SequelizeGenericError) {
			throw new DatabaseError(err.name);
		}
		throw new UnknownError();
	}
}
