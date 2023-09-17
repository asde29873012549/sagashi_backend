import { DataTypes } from "sequelize";

const FAQs = (sequelize) =>
	sequelize.define(
		"FAQs",
		{
			question: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			answer: {
				type: DataTypes.TEXT,
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
		},
	);

export default FAQs;
