import * as dotenv from "dotenv";
import { BaseError as SequelizeGenericError } from "sequelize";
import sequelize, { Model } from "../../../sequelize/index.js";
import { DatabaseError, UnknownError } from "../../utils/api_error.js";

dotenv.config();

export default async function dbGetFeaturedDesigners(req, res) {
	console.log(res.locals.user, "res.locals.user");

	const featuredDesigners = Model.FeaturedDesigners;
	const followedDesigners = Model.FollowedDesigners;

	const designers = Model.Designers;

	const { limit } = req.query;

	const includeArr = [
		{
			model: featuredDesigners,
			required: true,
			attributes: [],
		},
	];

	if (res.locals.user) {
		includeArr.push({
			model: followedDesigners,
			as: "designersBeingFollowedUsers",
			required: false,
			attributes: ["designer_id"],
			where: {
				user_name: res.locals.user,
			},
		});
	}

	try {
		const result = await sequelize.transaction(async (t) => {
			const featuredDesigner = await designers.findAll(
				{
					limit: limit || 25,
					attributes: ["id", "name", "logo", "created_at"],
					order: [["created_at", "ASC"]],
					include: includeArr,
				},
				{ transaction: t },
			);

			return featuredDesigner;
		});

		return result.map((obj) => {
			const { designersBeingFollowedUsers, ...neededData } = obj.dataValues;
			if (designersBeingFollowedUsers?.length > 0) {
				return {
					...neededData,
					isFollow: true,
				};
			}

			return neededData;
		});
	} catch (err) {
		console.log(err, "errrr");
		if (err instanceof SequelizeGenericError) {
			throw new DatabaseError(err.name);
		}
		throw new UnknownError();
	}
}
