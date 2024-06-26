import { DataTypes } from "sequelize";

const RecentlyViewed = (sequelize) =>
	sequelize.define(
		"RecentlyViewed",
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
			indexes: [
				{
					using: "BTREE",
					fields: ["user_name"],
				},
			],
		},
	);

export default RecentlyViewed;
