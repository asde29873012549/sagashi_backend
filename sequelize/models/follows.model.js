import { DataTypes } from "sequelize";

const Follows = (sequelize) =>
	sequelize.define(
		"Follows",
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			user_name: {
				type: DataTypes.STRING(80),
				references: {
					model: "Users",
					key: "username",
				},
			},
			follower_name: {
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
