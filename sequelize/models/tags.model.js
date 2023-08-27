import { DataTypes } from "sequelize";

const Tags = (sequelize) =>
	sequelize.define(
		"Tags",
		{
			text: {
				type: DataTypes.STRING,
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
					fields: ["text"],
				},
			],
		},
	);

export default Tags;
