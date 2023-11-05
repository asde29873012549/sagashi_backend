import { DataTypes } from "sequelize";

const Notifications = (sequelize) =>
	sequelize.define(
		"Notifications",
		{
			sender_name: {
				type: DataTypes.STRING(80),
				references: {
					model: "Users",
					key: "username",
				},
			},
			receiver_name: {
				type: DataTypes.STRING(80),
				references: {
					model: "Users",
					key: "username",
				},
			},
			notification_type: {
				type: DataTypes.STRING(1),
				allowNull: false,
			},
			link: {
				type: DataTypes.STRING(512),
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
					fields: ["receiver_name"],
				},
			],
		},
	);

export default Notifications;
