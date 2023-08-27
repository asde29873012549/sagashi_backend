import { DataTypes } from "sequelize";

const Notifications = (sequelize) =>
	sequelize.define(
		"Notifications",
		{
			message: {
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
					fields: ["receiver_id"],
				},
			],
		},
	);

export default Notifications;
