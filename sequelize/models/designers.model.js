import { DataTypes } from "sequelize";

const Designers = (sequelize) =>
	sequelize.define(
		"Designers",
		{
			name: {
				type: DataTypes.STRING(40),
				allowNull: false,
			},
			logo: {
				type: DataTypes.STRING(512),
			},
			banner: {
				type: DataTypes.STRING(512),
			},
			story: {
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

export default Designers;
