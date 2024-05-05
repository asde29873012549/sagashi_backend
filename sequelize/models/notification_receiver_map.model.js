import { DataTypes } from "sequelize";

const NotificationReceiverMap = (sequelize) =>
	sequelize.define(
		"NotificationReceiverMap",
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			notification_id: {
				type: DataTypes.INTEGER,
				references: {
					model: "Notifications",
					key: "id",
				},
			},
			username: {
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
