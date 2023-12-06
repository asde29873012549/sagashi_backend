import { DataTypes } from "sequelize";

const NotificationReceiverMap = (sequelize) =>
	sequelize.define(
		"NotificationReceiverMap",
		{
			notification_id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				references: {
					model: "Notifications",
					key: "id",
				},
			},
			username: {
				type: DataTypes.STRING(80),
				primaryKey: true,
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
			timestamps: "created_at",
			updatedAt: false,
			indexes: [
				{
					using: "BTREE",
					fields: ["username"],
				},
			],
		},
	);

export default NotificationReceiverMap;
