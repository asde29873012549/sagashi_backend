import * as dotenv from "dotenv";
import { BaseError as SequelizeGenericError } from "sequelize";
import sequelize, { Model } from "../../../sequelize/index.js";
import {
	DatabaseError,
	UnknownError,
	ValidationError,
} from "../../utils/api_error.js";

dotenv.config();

export default async function dbCreateOffer(req, res) {
	const offers = Model.Offers;

	const { product_id, offer_price } = req.body;

	const jwtUsername = res.locals.user;

	const numericPrice = Number(offer_price);
	if (Number.isNaN(numericPrice)) {
		throw new ValidationError();
	}

	try {
		const result = await sequelize.transaction(async (t) => {
			const offer = await offers.create(
				{
					user_name: jwtUsername,
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
