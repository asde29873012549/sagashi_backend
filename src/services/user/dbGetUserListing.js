import * as dotenv from "dotenv";
import { BaseError as SequelizeGenericError, Op } from "sequelize";
import sequelize, { Model } from "../../../sequelize/index.js";
import { DatabaseError, NotFoundError, UnknownError } from "../../utils/api_error.js";

dotenv.config();

export default async function dbGetUserListing(req, res) {
	const products = Model.Products;
	const sizes = Model.Sizes;

	const { cursor } = req.query;

	const jwtUsername = res.locals.user;

	try {
		const result = await sequelize.transaction(async (t) => {
			const user = await products.findAll(
				{
					attributes: ["name", "price", "desc", "primary_image", "createdAt"],
					where: {
						[Op.and]: [
							{
								id: {
									[Op.gt]: cursor || 0,
								},
							},
							{ seller_name: jwtUsername },
						],
					},
					include: {
						model: sizes,
						require: true,
						attributes: ["name"],
					},
					limit: 20,
					order: [["id", "DESC"]],
				},
				{ transaction: t },
			);

			return user;
		});

		return result;
	} catch (err) {
		console.log(err);
		if (err instanceof NotFoundError) {
			throw err;
		} else if (err instanceof SequelizeGenericError) {
			throw new DatabaseError(err.name);
		}
		throw new UnknownError();
	}
}
