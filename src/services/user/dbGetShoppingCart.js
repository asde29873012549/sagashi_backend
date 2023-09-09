import * as dotenv from "dotenv";
import sequelize, { Model } from "../../../sequelize/index.js";
import { DatabaseError, NotFoundError, ForbiddenError } from "../../utils/api_error.js";

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

			if (!shoppingCartItems) throw new NotFoundError();

			return shoppingCartItems;
		});

		return result;
	} catch (err) {
		if (err instanceof NotFoundError) {
			throw err;
		}
		console.log(err);
		throw new DatabaseError();
	}
}
