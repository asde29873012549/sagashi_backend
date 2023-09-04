import { DataTypes } from "sequelize";

const userAddress = (sequelize) =>
	sequelize.define(
		"Address",
		{
			user_name: {
				type: DataTypes.STRING(80),
				references: {
					model: "Users",
					key: "username",
				},
			},
			address: {
				type: DataTypes.STRING,
			},
			city: {
				type: DataTypes.STRING(70),
			},
			country: {
				type: DataTypes.STRING(70),
			},
			postal_code: {
				type: DataTypes.STRING(50),
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
					fields: ["user_name"],
				},
			],
		},
	);

export default userAddress;
