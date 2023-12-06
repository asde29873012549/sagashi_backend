import { DataTypes } from "sequelize";

const FeaturedDesigners = (sequelize) =>
	sequelize.define(
		"FeaturedDesigners",
		{
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
			indexes: [
				{
					using: "BTREE",
					fields: ["designer_id"],
				},
			],
		},
	);

export default FeaturedDesigners;
