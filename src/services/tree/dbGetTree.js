import * as dotenv from "dotenv";
import { BaseError as SequelizeGenericError } from "sequelize";
import sequelize, { Model } from "../../../sequelize/index.js";
import { DatabaseError, UnknownError } from "../../utils/api_error.js";
import { cat_generator, size_generator } from "../../utils/tree_helper.js";

dotenv.config();

export default async function dbGetTree(req) {
	const categories = Model.Categories;
	const sizes = Model.Sizes;
	const designers = Model.Designers;
	const featuredDesigners = Model.FeaturedDesigners;
	const tree = {};
	const categorySplitNum = 99;
	const dept = ["Menswear", "Womenswear"];
	const condition = ["New/Never Worn", "Gently Used", "Used", "Very Worn"];

	const { department, category } = req.query;

	try {
		const [Category, size, featuredDesigner] = await sequelize.transaction(async (t) => {
			const result = await Promise.all([
				categories.findAll(
					{
						attributes: ["level", "name", "start", "end"],
					},
					{ transaction: t },
				),
				categories.findAll(
					{
						attributes: ["level", "name", "start", "end"],
						include: {
							model: sizes,
							attributes: ["name"],
							required: true,
						},
					},
					{ transaction: t },
				),
				featuredDesigners.findAll(
					{
						attributes: ["designer_id"],
						include: {
							model: designers,
							attributes: ["name"],
						},
					},
					{ transaction: t },
				),
			]);

			return result;
		});

		tree.Department = dept;
		tree.NewArrivals = null;
		tree.Category = cat_generator(Category);
		tree.Sizes = size_generator(size, categorySplitNum);
		tree.Designer = featuredDesigner.map((designer) => designer.Designer.name);
		tree.Condition = condition;

		if (department) {
			tree.Category = { [department]: tree.Category[department] };
			tree.Sizes = { [department]: tree.Sizes[department] };
		}

		if (category) {
			tree.Category[department] = { [category]: tree.Category[department][category] };
			tree.Sizes[department] = { [category]: tree.Sizes[department][category] };
		}

		return tree;
	} catch (err) {
		if (err instanceof SequelizeGenericError) {
			throw new DatabaseError(err.name);
		}
		throw new UnknownError();
	}
}
