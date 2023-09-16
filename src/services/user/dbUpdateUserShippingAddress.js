import * as dotenv from "dotenv";
import { BaseError as SequelizeGenericError } from "sequelize";
import sequelize, { Model } from "../../../sequelize/index.js";
import {
	DatabaseError,
	NotFoundError,
	UnknownError,
	ForbiddenError,
} from "../../utils/api_error.js";

dotenv.config();

export default async function dbUpdateUserShippingAddress(req, res) {
	const addresses = Model.Address;

	const { id, username, address, city, country, postal_code } = req.body;

	const jwtUsername = res.locals.user;

	if (username !== jwtUsername) throw new ForbiddenError();

	try {
		const result = await sequelize.transaction(async (t) => {
			const address_result = await addresses.update(
				{
					user_name:username,
					address,
					city,
					country,
					postal_code
				},
				{
					where: {
						id,
					},
				},
				{ transaction: t },
			);

			return address_result;
		});

		return result;
	} catch (err) {
		if (err instanceof ForbiddenError || err instanceof NotFoundError) {
			throw err;
		} else if (err instanceof SequelizeGenericError) {
			throw new DatabaseError(err.name);
		}
		throw new UnknownError();
	}
}
