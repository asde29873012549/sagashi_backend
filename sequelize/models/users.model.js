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
				type: DataTypes.STRING(512),
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
			language: {
				type: DataTypes.STRING(50),
			},
			country: {
				type: DataTypes.STRING(100),
			},
			subscribe: {
				type: DataTypes.STRING(1),
				defaultValue: "0",
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
