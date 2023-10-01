import * as dotenv from "dotenv";
import { BaseError as SequelizeGenericError } from "sequelize";
import sequelize, { Model } from "../../../sequelize/index.js";
import { DatabaseError, UnknownError } from "../../utils/api_error.js";

dotenv.config();

export default async function dbGetFeaturedDesigners(req) {
	const featuredDesigners = Model.FeaturedDesigners;
	const designers = Model.Designers;

	const { limit } = req.query;

	try {
		const result = await sequelize.transaction(async (t) => {
			const featuredDesigner = await featuredDesigners.findAll(
				{
					limit: limit || 25,
					order: [["created_at", "DESC"]],
					include: {
						model: designers,
						required: true,
						attributes: ["name", "logo"]
					}
				},
				{ transaction: t },
			);

			return featuredDesigner;
		});

		return result;
	} catch (err) {
		if (err instanceof SequelizeGenericError) {
			throw new DatabaseError(err.name);
		}
		throw new UnknownError();
	}
}
