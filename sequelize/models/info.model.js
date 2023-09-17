import { DataTypes } from "sequelize";

const Info = (sequelize) =>
	sequelize.define(
		"Info",
		{
			orderDelivery: {
				type: DataTypes.TEXT,
			},
			returnRefuncd: {
				type: DataTypes.TEXT,
			},
			contactUs: {
				type: DataTypes.TEXT,
			},
			about: {
				type: DataTypes.TEXT,
			},
			termsConditions: {
				type: DataTypes.TEXT,
			},
			privacyPolicy: {
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
		},
	);

export default Info;
