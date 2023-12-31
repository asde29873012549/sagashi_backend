import * as dotenv from "dotenv";
import { BaseError as SequelizeGenericError, Op } from "sequelize";
import sequelize, { Model } from "../../../sequelize/index.js";
import { DatabaseError, UnknownError } from "../../utils/api_error.js";

dotenv.config();

export default async function dbFollowDesigner(req, res) {
	const followedDesigners = Model.FollowedDesigners;

	const { designer_id } = req.body;

	const jwtUsername = res.locals.user;

	try {
		const result = await sequelize.transaction(async (t) => {
			const rows_deleted = await followedDesigners.destroy(
				{
					where: {
						[Op.and]: [{ user_name: jwtUsername }, { designer_id }],
					},
				},
				{ transaction: t },
			);

			if (rows_deleted !== 0) return rows_deleted;

			const followedDesigner = await followedDesigners.create(
				{
					user_name: jwtUsername,
					designer_id,
				},
				{ transaction: t },
			);

			return followedDesigner;
		});

		return result;
	} catch (err) {
		console.log(err);
		if (err instanceof SequelizeGenericError) {
			throw new DatabaseError(err.name);
		}
		throw new UnknownError();
	}
}
