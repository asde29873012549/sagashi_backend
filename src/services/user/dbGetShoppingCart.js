import * as dotenv from "dotenv";
import { BaseError as SequelizeGenericError } from "sequelize";
import sequelize, { Model } from "../../../sequelize/index.js";
import { DatabaseError, UnknownError, ForbiddenError } from "../../utils/api_error.js";

dotenv.config();

export default async function dbGetShoppinCart(req, res) {
	const products = Model.Products;
	const shoppingCart = Model.ShoppingCart;

	const paramsUsername = req.params.username;
	const jwtUsername = res.locals.user;

	if (paramsUsername !== jwtUsername) throw new ForbiddenError();

	try {
		const result = await sequelize.transaction(async (t) => {
			const shoppingCartItems = await shoppingCart.findAll(
				{
					where: {
						user_name: jwtUsername,
					},
					include: [
						{
							model: products,
						},
					],
				},
				{ transaction: t },
			);

			return shoppingCartItems;
		});

		return result;
	} catch (err) {
		if (err instanceof ForbiddenError) {
			throw err;
		} else if (err instanceof SequelizeGenericError) {
			throw new DatabaseError(err.name);
		}
		throw new UnknownError();
	}
}
