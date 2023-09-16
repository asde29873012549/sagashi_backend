import { DataTypes } from "sequelize";

const Curations = (sequelize) =>
	sequelize.define(
		"Curations",
		{
			theme: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
			slogan: {
				type: DataTypes.STRING(200),
				allowNull: false,
			},
			image: {
				type: DataTypes.STRING(512)
			}
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

export default Curations;
