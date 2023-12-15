import * as dotenv from "dotenv";
import { BaseError as SequelizeGenericError } from "sequelize";
import sequelize, { Model } from "../../../sequelize/index.js";
import { DatabaseError, UnknownError, ForbiddenError } from "../../utils/api_error.js";

dotenv.config();

export default async function dbGetShoppinCartTotal(req, res) {
	const shoppingCart = Model.ShoppingCart;

	const jwtUsername = res.locals.user;

	if (!jwtUsername) throw new ForbiddenError();

	try {
		const result = await sequelize.transaction(async (t) => {
			const { count } = await shoppingCart.findAndCountAll(
				{
					where: {
						user_name: jwtUsername,
					},
				},
				{ transaction: t },
			);

			return count;
		});

		return result;
	} catch (err) {
		console.log(err);
		if (err instanceof ForbiddenError) {
			throw err;
		} else if (err instanceof SequelizeGenericError) {
			throw new DatabaseError(err.name);
		}
		throw new UnknownError();
	}
}
