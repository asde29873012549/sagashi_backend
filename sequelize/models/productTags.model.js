const ProductTags = (sequelize) =>
	sequelize.define(
		"ProductTags",
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
					fields: ["product_id"],
				},
			],
		},
	);

export default ProductTags;
