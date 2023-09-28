import * as dotenv from "dotenv";
import { BaseError as SequelizeGenericError } from "sequelize";
import sequelize, { Model } from "../../../sequelize/index.js";
import {
	DatabaseError,
	UnknownError,
	ForbiddenError,
	ValidationError,
} from "../../utils/api_error.js";

dotenv.config();

export default async function dbCreateOffer(req, res) {
	const offers = Model.Offers;

	const { username, product_id, offer_price } = req.body;

	const jwtUsername = res.locals.user;

	if (username !== jwtUsername) throw new ForbiddenError();

	const numericPrice = Number(offer_price);
	if (Number.isNaN(numericPrice)) {
		throw new ValidationError();
	}

	try {
		const result = await sequelize.transaction(async (t) => {
			const offer = await offers.create(
				{
					user_name: username,
					product_id,
					offer_price: numericPrice,
				},
				{ transaction: t },
			);

			return offer;
		});

		return result;
	} catch (err) {
		if (err instanceof SequelizeGenericError) {
			throw new DatabaseError(err.name);
		}
		throw new UnknownError();
	}
}
