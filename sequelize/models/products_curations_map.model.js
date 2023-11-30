import { DataTypes } from "sequelize";

const ProductsCurationsMap = (sequelize) =>
	sequelize.define(
		"ProductsCurationsMap",
		{
			product_id: {
				type: DataTypes.INTEGER,
				references: {
					model: "Products",
					key: "id",
				},
			},
			curation_id: {
				type: DataTypes.INTEGER,
				references: {
					model: "Curations",
					key: "id",
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
					fields: ["curation_id", "product_id"],
				},
			],
		},
	);

export default ProductsCurationsMap;
