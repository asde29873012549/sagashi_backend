import { DataTypes } from "sequelize";

const SizesCategoriesMap = (sequelize) =>
	sequelize.define(
		"SizesCategoriesMap",
		{
			size_id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				references: {
					model: "Sizes",
					key: "id",
				},
			},
			category_id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				references: {
					model: "Categories",
					key: "start",
				},
			},
		},
		{
			sequelize,
			underscored: true,
			schema: "sagashi",
			freezeTableName: true,
			timestamps: true,
			updatedAt: false,
			indexes: [
				{
					using: "BTREE",
					fields: ["category_id", "size_id"],
				},
			],
		},
	);

export default SizesCategoriesMap;
