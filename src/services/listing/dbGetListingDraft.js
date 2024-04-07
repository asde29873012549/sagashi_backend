import * as dotenv from "dotenv";
import { BaseError as SequelizeGenericError, Op } from "sequelize";
import sequelize, { Model } from "../../../sequelize/index.js";
import { DatabaseError, UnknownError } from "../../utils/api_error.js";

dotenv.config();

export default async function dbGetListingDraft(req, res) {
	const products = Model.Products;
	const sizes = Model.Sizes;
	const designers = Model.Designers;
	const category = Model.Categories;

	const jwtUsername = res.locals.user;

	try {
		const result = await sequelize.transaction(async (t) => {
			const draft_listing = await products.findAll(
				{
					attributes: [["id", "prod_id"], "name", "price", "condition", "color", "desc", "tags", "prod_cat_ref_start", "primary_image", "secondary_image", "status", "stock", "seller_name", "created_at", "updated_at"],
					include: [
						{
							attributes: ["name"],
							model: sizes,
							require: true,
						},
						{
							attributes: ["name"],
							model: designers,
							require: true,
						},
					],
					where: {
						seller_name: jwtUsername,
						status: "0",
					},
				},
				{ transaction: t },
			);

			if (draft_listing.length === 0) return [];

			const categoryData = await category.findAll(
				{
					where: {
						[Op.and]: [
							{ level: {
								[Op.and]: {
									[Op.gt]: 0,
									[Op.lte]: 3,
								}
							}},
							{
								start: {
									[Op.lte]: draft_listing[0].prod_cat_ref_start,
								}
							},
							{
								end: {
									[Op.gte]: Number(draft_listing[0].prod_cat_ref_start) + 1,
								}
							}
						]
					},
				},
				{ transaction: t },
			);

			const ress = {...draft_listing[0].dataValues};

			categoryData.forEach((catObj) => {
				switch (catObj.level) {
					case 1:
						ress.department = catObj.name;
						break;
					case 2:
						ress.category = catObj.name;
						break;
					case 3:
						ress.subCategory = catObj.name;
						break;
					default:
						throw new UnknownError();
				}
			});

			ress.designer = ress.Designer?.name ?? null;
			ress.size = ress.Size?.name ?? null;
			delete ress.Designer;
			delete ress.Size;
			delete ress.prod_cat_ref_start;

			return [ress];
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
