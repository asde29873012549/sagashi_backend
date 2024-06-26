import * as dotenv from "dotenv";
import { BaseError as SequelizeGenericError } from "sequelize";
import sequelize, { Model } from "../../../sequelize/index.js";
import { DatabaseError, UnknownError } from "../../utils/api_error.js";

dotenv.config();

export default async function dbGetRecentlyViewed(req, res) {
	const recentlyViewed = Model.RecentlyViewed;
	const products = Model.Products;
	const sizes = Model.Sizes;

	const jwtUsername = res.locals.user;

	try {
		const result = await sequelize.transaction(async (t) => {
			const views = await recentlyViewed.findAll(
				{
					where: {
						user_name: jwtUsername,
					},
					include: {
						attributes: ["name", "price", "desc", "primary_image", "created_at", "seller_name"],
						model: products,
						require: true,
						include: {
							attributes: ["name"],
							model: sizes,
							require: true,
						},
					},
					order: [["updated_at", "DESC"]],
					limit: 8,
				},
				{ transaction: t },
			);

			return views;
		});

		return result;
	} catch (err) {
		if (err instanceof SequelizeGenericError) {
			throw new DatabaseError(err.name);
		}
		throw new UnknownError();
	}
}
