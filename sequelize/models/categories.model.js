import { DataTypes } from "sequelize";

const Categories = (sequelize) =>
	sequelize.define(
		"Categories",
		{
			level: {
				type: DataTypes.SMALLINT,
			},
			name: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
			start: {
				type: DataTypes.SMALLINT,
				unique: true,
			},
			end: {
				type: DataTypes.SMALLINT,
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
					fields: ["level", "name", "start", "end"],
				},
			],
		},
	);

export default Categories;
