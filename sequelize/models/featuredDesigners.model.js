const FeaturedDesigners = (sequelize) =>
	sequelize.define(
		"FeaturedDesigners",
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
					fields: ["designer_id"],
				},
			],
		},
	);

export default FeaturedDesigners;
