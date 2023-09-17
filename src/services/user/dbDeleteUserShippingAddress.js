import * as dotenv from "dotenv";
import { BaseError as SequelizeGenericError, Op } from "sequelize";
import sequelize, { Model } from "../../../sequelize/index.js";
import {
	DatabaseError,
	NotFoundError,
	UnknownError,
	ForbiddenError,
} from "../../utils/api_error.js";

dotenv.config();

export default async function dbDeleteUserShippingAddress(req, res) {
	const address = Model.Address;

	const { username, id } = req.params;

	const jwtUsername = res.locals.user;

	if (username !== jwtUsername) throw new ForbiddenError();

	try {
		const result = await sequelize.transaction(async (t) => {
			const addresses = await address.destroy(
				{
					where: {
						[Op.and]: [{ user_name: username }, { id }],
					},
				},
				{ transaction: t },
			);

			return addresses;
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
