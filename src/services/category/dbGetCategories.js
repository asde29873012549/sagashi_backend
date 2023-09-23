import * as dotenv from "dotenv";
import { BaseError as SequelizeGenericError } from "sequelize";
import sequelize, { Model } from "../../../sequelize/index.js";
import { DatabaseError, UnknownError } from "../../utils/api_error.js";
import { cat_generator } from "../../utils/tree_helper.js";

dotenv.config();

export default async function dbGetCategories() {
	const categories = Model.Categories;

	try {
		const result = await sequelize.transaction(async (t) =>
			categories.findAll({ attributes: ["level", "name", "start", "end"] }, { transaction: t }),
		);

		return cat_generator(result);
	} catch (err) {
		if (err instanceof SequelizeGenericError) {
			throw new DatabaseError(err.name);
		}
		throw new UnknownError();
	}
}
