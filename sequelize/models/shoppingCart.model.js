const ShoppingCart = (sequelize) =>
	sequelize.define(
		"ShoppingCart",
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
			],
		},
	);

export default ShoppingCart;
