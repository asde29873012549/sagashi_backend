import { DataTypes } from "sequelize";

const Sizes = (sequelize) =>
	sequelize.define(
		"Sizes",
		{
			name: {
				type: DataTypes.STRING(10),
				allowNull: false,
			},
			category_start: {
				type: DataTypes.INTEGER,
				references: {
					model: "Categories",
					key: "start",
				},
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
