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
			type: {
				type: DataTypes.STRING(20),
				allowNull: false,
			},
			image: {
				type: DataTypes.STRING(512),
			},
			content: {
				type: DataTypes.JSONB,
			},
			link: {
				type: DataTypes.STRING(512),
			},
			read_at: {
				type: DataTypes.DATE,
			},
			created_at: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: DataTypes.NOW,
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
					fields: ["receiver_name"],
				},
			],
		},
	);

export default Notifications;
