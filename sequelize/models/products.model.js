import { DataTypes } from "sequelize";

const Products = (sequelize) =>
	sequelize.define(
		"Products",
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			stock: {
				type: DataTypes.SMALLINT,
				allowNull: false,
				defaultValue: 1,
			},
			price: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: false,
			},
			desc: {
				type: DataTypes.TEXT,
			},
			primary_image: {
				type: DataTypes.STRING(512),
				allowNull: false,
			},
			secondary_image: {
				type: DataTypes.JSONB,
			},
			status: {
				type: DataTypes.SMALLINT,
				allowNull: false,
				defaultValue: 1,
			},
			color_id: {
				type: DataTypes.SMALLINT,
				allowNull: false,
			},
			condition_id: {
				type: DataTypes.SMALLINT,
				allowNull: false,
			},
			tags: {
				type: DataTypes.STRING(512),
			},
		},
		{
			sequelize,
			underscored: true,
			schema: "sagashi",
			freezeTableName: true,
			indexes: [
				{
					using: "BTREE",
					fields: ["condition_id"],
				},
				{
					using: "BTREE",
					fields: ["designer_id"],
				},
				{
					using: "BTREE",
					fields: ["prod_cat_ref_start"],
				},
				{
					using: "BTREE",
					fields: ["size_id"],
				},
			],
		},
	);

export default Products;
