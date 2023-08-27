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
					fields: ["user_id", "follower_id"],
				},
			],
		},
	);

export default Follows;
