import { DataTypes } from "sequelize";

const Offers = (sequelize) =>
	sequelize.define(
		"Offers",
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			user_name: {
				type: DataTypes.STRING(80),
				references: {
					model: "Users",
					key: "username",
				},
			},
			product_id: {
				type: DataTypes.INTEGER,
				references: {
					model: "Products",
					key: "id",
				},
			},
			offer_price: {
				type: DataTypes.DECIMAL(8, 2),
				allowNull: false,
			},
			active: {
				type: DataTypes.SMALLINT,
				defaultValue: 1,
			},
		},
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
					fields: ["user_name", "product_id"],
				},
			],
		},
	);

export default Offers;
