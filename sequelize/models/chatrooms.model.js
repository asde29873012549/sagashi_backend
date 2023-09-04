import { DataTypes } from "sequelize";

const Chatrooms = (sequelize) =>
	sequelize.define(
		"Chatrooms",
		{
			seller_name: {
				type: DataTypes.STRING(80),
				references: {
					model: "Users",
					key: "username",
				},
			},
			buyer_name: {
				type: DataTypes.STRING(80),
				references: {
					model: "Users",
					key: "username",
				},
			},
			last_sent_user_name: {
				type: DataTypes.STRING(80),
				references: {
					model: "Users",
					key: "username",
				},
			},
			last_message: {
				type: DataTypes.TEXT,
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
					fields: ["seller_name"],
				},
			],
		},
	);

export default Chatrooms;
