import * as dotenv from "dotenv";
import { BaseError as SequelizeGenericError } from "sequelize";
import sequelize, { Model } from "../../../sequelize/index.js";
import { DatabaseError, UnknownError } from "../../utils/api_error.js";

dotenv.config();

export default async function dbGetSizes(req) {
	const sizes = Model.Sizes;
	const sizesCategoriesMap = Model.SizesCategoriesMap;

	const { category_id } = req.params;


	try {
		const result = await sequelize.transaction(async (t) => {
			const size = await sizesCategoriesMap.findAll(
				{
					attributes: ["category_id"],
					where: {
						category_id,
					},
					include: {
						model: sizes,
						attributes: ["id", "name"],
						required: true,
					},
				},
				{ transaction: t },
			);

			return size;
		});

		return result;
	} catch (err) {
		if (err instanceof SequelizeGenericError) {
			throw new DatabaseError(err.name);
		}
		throw new UnknownError();
	}
}
