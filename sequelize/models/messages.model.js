import { DataTypes } from "sequelize";

const Messages = (sequelize) =>
	sequelize.define(
		"Messages",
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			sender_name: {
				type: DataTypes.STRING(80),
				references: {
					model: "Users",
					key: "username",
				},
			},
			chatroom_id: {
				type: DataTypes.STRING(255),
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
			createdAt: "created_at",
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
