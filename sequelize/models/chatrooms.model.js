import { DataTypes } from "sequelize";

const Chatrooms = (sequelize) =>
	sequelize.define(
		"Chatrooms",
		{
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
					fields: ["seller_id"],
				},
			],
		},
	);

export default Chatrooms;
