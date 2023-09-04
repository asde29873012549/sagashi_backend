import { DataTypes } from "sequelize";

const Products_to_be_sync = (sequelize) =>
	sequelize.define(
		"Products_to_be_sync",
		{
			prod_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			seller_name: {
				type: DataTypes.STRING(80),
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			department: {
				type: DataTypes.STRING(10),
				allowNull: false,
			},
			category: {
				type: DataTypes.STRING(20),
				allowNull: false,
			},
			sub_category: {
				type: DataTypes.STRING(20),
				allowNull: false,
			},
			designer: {
				type: DataTypes.STRING(40),
				allowNull: false,
				defaultValue: 1,
			},
			stock: {
				type: DataTypes.SMALLINT,
				allowNull: false,
				defaultValue: 1,
			},
			price: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: false,
			},
			desc: {
				type: DataTypes.TEXT,
			},
			primary_image: {
				type: DataTypes.STRING(512),
				allowNull: false,
			},
			secondary_image: {
				type: DataTypes.JSONB,
			},
			status: {
				type: DataTypes.SMALLINT,
				allowNull: false,
				defaultValue: 1,
			},
			color: {
				type: DataTypes.STRING(20),
				allowNull: false,
			},
			discount: {
				type: DataTypes.DECIMAL(3, 2),
			},
			condition: {
				type: DataTypes.STRING(20),
				allowNull: false,
			},
			tags: {
				type: DataTypes.STRING(512),
			},
			size: {
				type: DataTypes.STRING(10),
				allowNull: false,
			},
		},
		{
			sequelize,
			underscored: true,
			schema: "sagashi",
			freezeTableName: true,
		},
	);

export default Products_to_be_sync;
