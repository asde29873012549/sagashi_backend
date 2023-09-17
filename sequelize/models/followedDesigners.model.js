import { DataTypes } from "sequelize";

const FollowedDesigners = (sequelize) =>
	sequelize.define(
		"FollowedDesigners",
		{
			user_name: {
				type: DataTypes.STRING(80),
				references: {
					model: "Users",
					key: "username",
				},
			},
			designer_id: {
				type: DataTypes.INTEGER,
				references: {
					model: "Designers",
					key: "id",
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
		},
	);

export default FollowedDesigners;
