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
	} = sequelize.models;

	// Users < Products => One-To-Many
	Users.hasMany(Products, {
		foreignKey: {
			name: "seller_name",
		},
	});
	Products.belongsTo(Users, {
		foreignKey: {
			name: "seller_name",
		},
	});

	// Categories < Sizes => One-To-Many
	Categories.hasMany(Sizes);
	Sizes.belongsTo(Categories);

	// Users < Chatrooms => One-To-Many
	Users.hasMany(Chatrooms, {
		foreignKey: {
			name: "last_sent_user_name",
		},
	});
	Users.hasMany(Chatrooms, {
		foreignKey: {
			name: "seller_name",
		},
	});
	Users.hasMany(Chatrooms, {
		foreignKey: {
			name: "buyer_name",
		},
	});
	Chatrooms.belongsTo(Users, {
		foreignKey: {
			name: "last_sent_user_name",
		},
	});
	Chatrooms.belongsTo(Users, {
		foreignKey: {
			name: "seller_name",
		},
	});
	Chatrooms.belongsTo(Users, {
		foreignKey: {
			name: "buyer_name",
		},
	});

	// Designers - FeaturedDesingers One-To-One
	Designers.hasOne(FeaturedDesigners);
	FeaturedDesigners.belongsTo(Designers);

	// Users < Follows One-To-Many
	Users.hasMany(Follows, {
		foreignKey: {
			name: "user_name",
		},
	});
	Users.hasMany(Follows, {
		foreignKey: {
			name: "follower_name",
		},
	});
	Follows.belongsTo(Users, {
		foreignKey: {
			name: "user_name",
		},
	});
	Follows.belongsTo(Users, {
		foreignKey: {
			name: "follower_name",
		},
	});

	// Users <> Products Many-To-Many through Likes
	Users.belongsToMany(Products, {
		through: {
			model: Likes,
		},
		foreignKey: "user_name",
		otherKey: "product_id",
	});
	Products.belongsToMany(Users, {
		through: {
			model: Likes,
		},
		foreignKey: "product_id",
		otherKey: "user_name",
	});
	Users.hasMany(Likes, {
		foreignKey: {
			name: "user_name",
		},
	});
	Products.hasMany(Likes, {
		foreignKey: {
			name: "product_id",
		},
	});
	Likes.belongsTo(Users, {
		foreignKey: {
			name: "user_name",
		},
	});
	Likes.belongsTo(Products, {
		foreignKey: {
			name: "product_id",
		},
	});

	// Users < Messages One-To-Many
	Users.hasMany(Messages, {
		foreignKey: {
			name: "sender_name",
		},
	});
	Messages.belongsTo(Users, {
		foreignKey: {
			name: "sender_name",
		},
	});

	// Chatrooms < Message One-To-Many
	Chatrooms.hasMany(Messages);
	Messages.belongsTo(Chatrooms);

	// Users < Notifications One-To-Many
	Users.hasMany(Notifications, {
		foreignKey: {
			name: "receiver_name",
		},
	});
	Users.hasMany(Notifications, {
		foreignKey: {
			name: "sender_name",
		},
	});
	Notifications.belongsTo(Users, {
		foreignKey: {
			name: "receiver_name",
		},
	});
	Notifications.belongsTo(Users, {
		foreignKey: {
			name: "sender_name",
		},
	});

	// Users <> Products Many-To-Many through Offers
	Users.belongsToMany(Products, {
		through: {
			model: Offers,
		},
		foreignKey: "user_name",
		otherKey: "product_id",
	});
	Products.belongsToMany(Users, {
		through: {
			model: Offers,
		},
		foreignKey: "product_id",
		otherKey: "user_name",
	});
	Users.hasMany(Offers, {
		foreignKey: {
			name: "user_name",
		},
	});
	Products.hasMany(Offers, {
		foreignKey: {
			name: "product_id",
		},
	});
	Offers.belongsTo(Users, {
		foreignKey: {
			name: "user_name",
		},
	});
	Offers.belongsTo(Products, {
		foreignKey: {
			name: "product_id",
		},
	});

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

	// Users <> Products Many-To-Many through RecentlyViewed
	Users.belongsToMany(Products, {
		through: {
			model: RecentlyViewed,
		},
		foreignKey: "user_name",
		otherKey: "product_id",
	});
	Products.belongsToMany(Users, {
		through: {
			model: RecentlyViewed,
		},
		foreignKey: "product_id",
		otherKey: "user_name",
	});
	Users.hasMany(RecentlyViewed, {
		foreignKey: {
			name: "user_name",
		},
	});
	Products.hasMany(RecentlyViewed, {
		foreignKey: {
			name: "product_id",
		},
	});
	RecentlyViewed.belongsTo(Users, {
		foreignKey: {
			name: "user_name",
		},
	});
	RecentlyViewed.belongsTo(Products, {
		foreignKey: {
			name: "product_id",
		},
	});

	// Users <> Products Many-To-Many through ShoppingCart
	Users.belongsToMany(Products, {
		through: {
			model: ShoppingCart,
		},
		foreignKey: "user_name",
		otherKey: "product_id",
	});
	Products.belongsToMany(Users, {
		through: {
			model: ShoppingCart,
		},
		foreignKey: "product_id",
		otherKey: "user_name",
	});
	Users.hasMany(ShoppingCart, {
		foreignKey: {
			name: "user_name",
		},
	});
	Products.hasMany(ShoppingCart, {
		foreignKey: {
			name: "product_id",
		},
	});
	ShoppingCart.belongsTo(Users, {
		foreignKey: {
			name: "user_name",
		},
	});
	ShoppingCart.belongsTo(Products, {
		foreignKey: {
			name: "product_id",
		},
	});

	// Users < Address One-To-Many
	Users.hasMany(Address, {
		foreignKey: {
			name: "user_name",
		},
	});
	Address.belongsTo(Users, {
		foreignKey: {
			name: "user_name",
		},
	});
};

export default applyAssociations;
