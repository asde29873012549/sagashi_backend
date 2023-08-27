import { DataTypes } from "sequelize";

const applyAssociations = (sequelize) => {
	const {
		Categories,
		Chatrooms,
		Designers,
		Discounts,
		FeaturedDesigners,
		Follows,
		Likes,
		Messages,
		Notifications,
		Offers,
		Products,
		RecentlyViewed,
		ShoppingCart,
		Sizes,
		Address,
		Users,
		Tags,
		ProductTags,
	} = sequelize.models;

	// Categories < Sizes => One-To-Many
	Categories.hasMany(Sizes);
	Sizes.belongsTo(Categories);

	// Users < Chatrooms => One-To-Many
	Users.hasMany(Chatrooms, {
		foreignKey: {
			name: "last_sent_user_id",
		},
	});
	Users.hasMany(Chatrooms, {
		foreignKey: {
			name: "seller_id",
		},
	});
	Users.hasMany(Chatrooms, {
		foreignKey: {
			name: "buyer_id",
		},
	});
	Chatrooms.belongsTo(Users, {
		foreignKey: {
			name: "last_sent_user_id",
		},
	});
	Chatrooms.belongsTo(Users, {
		foreignKey: {
			name: "seller_id",
		},
	});
	Chatrooms.belongsTo(Users, {
		foreignKey: {
			name: "buyer_id",
		},
	});

	// Designers - FeaturedDesingers One-To-One
	Designers.hasOne(FeaturedDesigners);
	FeaturedDesigners.belongsTo(Designers);

	// Users < Follows One-To-Many
	Users.hasMany(Follows, {
		foreignKey: {
			name: "user_id",
			type: DataTypes.INTEGER,
		},
	});
	Users.hasMany(Follows, {
		foreignKey: {
			name: "follower_id",
			type: DataTypes.INTEGER,
		},
	});
	Follows.belongsTo(Users, {
		foreignKey: {
			name: "user_id",
			type: DataTypes.INTEGER,
		},
	});
	Follows.belongsTo(Users, {
		foreignKey: {
			name: "follower_id",
			type: DataTypes.INTEGER,
		},
	});

	// Users <> Products Many-To-Many through Likes
	Users.belongsToMany(Products, { through: Likes });
	Products.belongsToMany(Users, { through: Likes });

	// Users < Messages One-To-Many
	Users.hasMany(Messages, {
		foreignKey: {
			name: "sender_id",
			type: DataTypes.INTEGER,
		},
	});
	Messages.belongsTo(Users, {
		foreignKey: {
			name: "sender_id",
			type: DataTypes.INTEGER,
		},
	});

	// Chatrooms < Message One-To-Many
	Chatrooms.hasMany(Messages);
	Messages.belongsTo(Chatrooms);

	// Users < Notifications One-To-Many
	Users.hasMany(Notifications);
	Notifications.belongsTo(Users, {
		foreignKey: {
			name: "receiver_id",
			type: DataTypes.INTEGER,
		},
	});
	Notifications.belongsTo(Users, {
		foreignKey: {
			name: "sender_id",
			type: DataTypes.INTEGER,
		},
	});

	// Users <> Products Many-To-Many through Offers
	Users.belongsToMany(Products, { through: Offers });
	Products.belongsToMany(Users, { through: Offers });

	// Categories < Products One-To-Many
	Categories.hasMany(Products, {
		sourceKey: "start",
		foreignKey: {
			name: "prod_cat_ref_start",
			type: DataTypes.INTEGER,
		},
	});
	Products.belongsTo(Categories, {
		targetKey: "start",
		foreignKey: {
			name: "prod_cat_ref_start",
			type: DataTypes.INTEGER,
		},
	});

	// Designers < Products One-To-Many
	Designers.hasMany(Products);
	Products.belongsTo(Designers);

	// Sizes < Products One-To-Many
	Sizes.hasMany(Products);
	Products.belongsTo(Sizes);

	// Discounts < Products One-To-Many
	Discounts.hasMany(Products);
	Products.belongsTo(Discounts);

	// Products <> Tags Many-To-Many through ProductTags
	Products.belongsToMany(Tags, { through: ProductTags });
	Tags.belongsToMany(Products, { through: ProductTags });

	// Users <> Products Many-To-Many through RecentlyViewed
	Users.belongsToMany(Products, { through: RecentlyViewed });
	Products.belongsToMany(Users, { through: RecentlyViewed });

	// Users <> Products Many-To-Many through ShoppingCart
	Users.belongsToMany(Products, { through: ShoppingCart });
	Products.belongsToMany(Users, { through: ShoppingCart });

	// Users < Address One-To-Many
	Users.hasMany(Address);
	Address.belongsTo(Users);
};

export default applyAssociations;
