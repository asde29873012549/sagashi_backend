import * as dotenv from "dotenv";
import { Op, BaseError as SequelizeGenericError } from "sequelize";
import sequelize, { Model } from "../../../sequelize/index.js";
import { DatabaseError, UnknownError } from "../../utils/api_error.js";

dotenv.config();

export default async function dbGetIsFollowDesigner(req, res) {
	const followedDesigners = Model.FollowedDesigners;

	const { designer_id } = req.params;

	const jwtUsername = res.locals.user;

	try {
		const result = await sequelize.transaction(async (t) => {
			const followedDesigner = await followedDesigners.findOne(
				{
					where: {
						[Op.and]: [{ user_name: jwtUsername }, { designer_id }],
					},
				},
				{ transaction: t },
			);

			return followedDesigner;
		});

		return result;
	} catch (err) {
		if (err instanceof SequelizeGenericError) {
			throw new DatabaseError(err.name);
		}
		throw new UnknownError();
	}
}
