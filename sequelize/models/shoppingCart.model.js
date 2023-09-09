import { DataTypes } from "sequelize";

const ShoppingCart = (sequelize) =>
	sequelize.define(
		"ShoppingCart",
		{
			user_name: {
				type: DataTypes.STRING(80),
				primaryKey: true,
				references: {
					model: "Users",
					key: "username",
				},
			},
			product_id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				references: {
					model: "Products",
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
					fields: ["user_name", "product_id"],
				},
			],
		},
	);

export default ShoppingCart;
