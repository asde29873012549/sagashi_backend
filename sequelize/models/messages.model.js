import { DataTypes } from "sequelize";

const Messages = (sequelize) =>
	sequelize.define(
		"Messages",
		{
			sender_name: {
				type: DataTypes.STRING(80),
				references: {
					model: "Users",
					key: "username",
				},
			},
			chatroom_id: {
				type: DataTypes.INTEGER,
				references: {
					model: "Chatrooms",
					key: "id",
				},
			},
			text: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			read_at: {
				type: DataTypes.DATE,
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
					fields: ["chatroom_id"],
				},
				{
					using: "BTREE",
					fields: ["sender_name"],
				},
			],
		},
	);

export default Messages;
