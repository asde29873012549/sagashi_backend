import { DataTypes } from "sequelize";

const Users = (sequelize) =>
	sequelize.define(
		"Users",
		{
			username: {
				type: DataTypes.STRING(80),
				primaryKey: true,
			},
			password: {
				type: DataTypes.STRING(80),
				allowNull: false,
			},
			fullname: {
				type: DataTypes.STRING(70),
			},
			avatar: {
				type: DataTypes.STRING,
			},
			email: {
				type: DataTypes.STRING(100),
			},
			birth_date: {
				type: DataTypes.DATEONLY,
			},
			gender: {
				type: DataTypes.STRING(10),
			},
			country: {
				type: DataTypes.STRING(100),
			},
		},
		{
			sequelize,
			underscored: true,
			freezeTableName: true,
			schema: "sagashi",
		},
	);

export default Users;
