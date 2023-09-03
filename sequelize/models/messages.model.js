import { DataTypes } from "sequelize";

const Messages = (sequelize) =>
	sequelize.define(
		"Messages",
		{
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
