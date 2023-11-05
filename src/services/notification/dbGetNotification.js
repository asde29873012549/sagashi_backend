import * as dotenv from "dotenv";
import { BaseError as SequelizeGenericError, Op } from "sequelize";
import sequelize, { Model } from "../../../sequelize/index.js";
import { DatabaseError, UnknownError } from "../../utils/api_error.js";

dotenv.config();

export default async function dbGetNotification(req, res) {
	const notification = Model.Notifications;

	const { cursor } = req.params;

	const jwtUsername = res.locals.user;

	const sqlObj = {
		where: {
			receiver_name: jwtUsername,
		},
		order: [["create_date", "desc"]],
		limit: 10,
	};

	if (cursor) sqlObj.where.id = { [Op.gt]: cursor };

	try {
		const result = await sequelize.transaction(async (t) => {
			const notifications = await notification.findAll(sqlObj, { transaction: t });

			return notifications;
		});

		return result;
	} catch (err) {
		if (err instanceof SequelizeGenericError) {
			throw new DatabaseError(err.name);
		}
		throw new UnknownError();
	}
}
