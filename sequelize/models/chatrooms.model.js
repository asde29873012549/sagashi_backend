import { DataTypes } from "sequelize";

const Chatrooms = (sequelize) =>
	sequelize.define(
		"Chatrooms",
		{
			id: {
				type: DataTypes.STRING(255),
				primaryKey: true,
				reference: {
					model: "Messages",
					key: "id",
				},
			},
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
			chatroom_avatar: {
				type: DataTypes.TEXT,
			},
			link: {
				type: DataTypes.STRING(255),
			},
		},
		{
			sequelize,
			underscored: true,
			schema: "sagashi",
			freezeTableName: true,
			timestamps: true,
			updatedAt: true,
			indexes: [
				{
					using: "BTREE",
					fields: ["seller_name"],
				},
			],
		},
	);

export default Chatrooms;
