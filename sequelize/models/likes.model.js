const Likes = (sequelize) =>
	sequelize.define(
		"Likes",
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
					fields: ["user_name"],
				},
				{
					using: "BTREE",
					fields: ["product_id"],
				},
			],
		},
	);

export default Likes;
