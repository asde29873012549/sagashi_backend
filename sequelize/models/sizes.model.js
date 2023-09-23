import { DataTypes } from "sequelize";

const Sizes = (sequelize) =>
	sequelize.define(
		"Sizes",
		{
			name: {
				type: DataTypes.STRING(10),
				allowNull: false,
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
					fields: ["name"],
				},
			],
		},
	);

export default Sizes;
