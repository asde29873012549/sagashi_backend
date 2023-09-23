import * as dotenv from "dotenv";
import { BaseError as SequelizeGenericError, Op } from "sequelize";
import sequelize, { Model } from "../../../sequelize/index.js";
import { DatabaseError, UnknownError, ForbiddenError } from "../../utils/api_error.js";

dotenv.config();

export default async function dbGetShoppinCart(req, res) {
	const products = Model.Products;
	const shoppingCart = Model.ShoppingCart;
	const sizes = Model.Sizes;
	const discounts = Model.Discounts;
	const offers = Model.Offers;

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
							attributes: ["id", "seller_name", "name", "price", "desc", "primary_image"],
							model: products,
							require: true,
							include: [
								{
									model: sizes,
									require: true,
									attributes: ["name"],
								},
								{
									model: discounts,
									require: true,
									attributes: ["percent"],
								},
							],
						},
					],
				},
				{ transaction: t },
			);

			const offer = await offers.findAll(
				{
					attributes: ["product_id", "offer_price"],
					where: {
						user_name: jwtUsername,
						product_id: {
							[Op.in]: shoppingCartItems.map((item) => item.product_id),
						},
						active: "1",
					},
				},
				{ transaction: t },
			);

			return { shoppingCartItems, offer };
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
