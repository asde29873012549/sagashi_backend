import { DataTypes } from "sequelize";

const Follows = (sequelize) =>
	sequelize.define(
		"Follows",
		{
			user_name: {
				type: DataTypes.STRING(80),
				references: {
					model: "Users",
					key: "username",
				},
			},
			folower_name: {
				type: DataTypes.STRING(80),
				references: {
					model: "Users",
					key: "username",
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
					fields: ["user_name", "follower_name"],
				},
			],
		},
	);

export default Follows;
