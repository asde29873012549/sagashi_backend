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
				allowNull: false,
			},
			avatar: {
				type: DataTypes.STRING,
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
