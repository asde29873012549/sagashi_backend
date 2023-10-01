import { DataTypes } from "sequelize";

const Products = (sequelize) =>
	sequelize.define(
		"Products",
		{
			seller_name: {
				type: DataTypes.STRING(80),
				allowNull: false,
				references: {
					model: "Users",
					key: "username",
				},
			},
			name: {
				type: DataTypes.STRING,
			},
			stock: {
				type: DataTypes.SMALLINT,
				defaultValue: 1,
			},
			price: {
				type: DataTypes.DECIMAL(10, 2),
			},
			desc: {
				type: DataTypes.TEXT,
			},
			primary_image: {
				type: DataTypes.STRING(512),
			},
			secondary_image: {
				type: DataTypes.JSONB,
			},
			status: {
				type: DataTypes.STRING(1),
				defaultValue: 1,
			},
			color: {
				type: DataTypes.STRING(10),
			},
			condition: {
				type: DataTypes.STRING(15),
			},
			tags: {
				type: DataTypes.STRING(512),
			},
			prod_cat_ref_start: {
				type: DataTypes.INTEGER,
				references: {
					model: "Categories",
					key: "start",
				},
			},
			designer_id: {
				type: DataTypes.INTEGER,
				references: {
					model: "Designers",
					key: "id",
				},
			},
			size_id: {
				type: DataTypes.INTEGER,
				references: {
					model: "Sizes",
					key: "id",
				},
			},
			discount_id: {
				type: DataTypes.INTEGER,
				references: {
					model: "Discounts",
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
			indexes: [
				{
					using: "BTREE",
					fields: ["condition"],
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
				{
					using: "BTREE",
					fields: ["seller_name"],
				},
			],
		},
	);

export default Products;
