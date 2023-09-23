import { DataTypes } from "sequelize";

const Discounts = (sequelize) =>
	sequelize.define(
		"Discounts",
		{
			percent: {
				type: DataTypes.DECIMAL(3, 2),
				allowNull: false,
			},
		},
		{
			sequelize,
			underscored: true,
			schema: "sagashi",
			freezeTableName: true,
		},
	);

export default Discounts;
