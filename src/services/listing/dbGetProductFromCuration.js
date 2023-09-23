import * as dotenv from "dotenv";
import { BaseError as SequelizeGenericError, Op } from "sequelize";
import sequelize, { Model } from "../../../sequelize/index.js";
import { DatabaseError, UnknownError } from "../../utils/api_error.js";

dotenv.config();

export default async function dbGetProductFromCuration(req) {
	const products = Model.Products;

	const { curation_id } = req.params;
	const { cursor } = req.query;

	try {
		const result = await sequelize.transaction(async (t) => {
			const curation = await products.findAll(
				{
					where: {
						curation_id,
						id: {
							[Op.lt]: cursor,
						},
					},
					order: [["id", "DESC"]],
					limit: 20,
				},
				{ transaction: t },
			);

			return curation;
		});

		return result;
	} catch (err) {
		if (err instanceof SequelizeGenericError) {
			throw new DatabaseError(err.name);
		}
		throw new UnknownError();
	}
}
