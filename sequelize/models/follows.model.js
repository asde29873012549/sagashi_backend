const Follows = (sequelize) =>
	sequelize.define(
		"Follows",
		{},
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
					fields: ["user_name", "follower_name"],
				},
			],
		},
	);

export default Follows;
