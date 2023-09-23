import * as dotenv from "dotenv";
import { BaseError as SequelizeGenericError } from "sequelize";
import sequelize, { Model } from "../../../sequelize/index.js";
import { DatabaseError, UnknownError } from "../../utils/api_error.js";

dotenv.config();

export default async function dbGetCuration() {
	const curations = Model.Curations;

	try {
		const result = await sequelize.transaction(async (t) => {
			const curation = await curations.findAll(
				{
					order: [["created_at", "DESC"]],
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
