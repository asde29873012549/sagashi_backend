import { DataTypes } from "sequelize";

const applyAssociations = (sequelize) => {
	const {
		Categories,
		Messages,
		Chatrooms,
		Curations,
		Designers,
		Discounts,
		FeaturedDesigners,
		FollowedDesigners,
		Follows,
		Likes,
		Notifications,
		Offers,
		Products,
		RecentlyViewed,
		ShoppingCart,
		Sizes,
		Address,
		Users,
		SizesCategoriesMap,
		ProductsCurationsMap,
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

	// Categories <> Sizes => Many-To-Many through SizesCategoriesMap
	Categories.belongsToMany(Sizes, {
		through: {
			model: SizesCategoriesMap,
		},
		foreignKey: "category_id",
		otherKey: "size_id",
	});
	Sizes.belongsToMany(Categories, {
		through: {
			model: SizesCategoriesMap,
		},
		foreignKey: "size_id",
		otherKey: "category_id",
	});
	Categories.hasMany(SizesCategoriesMap, {
		foreignKey: {
			name: "category_id",
		},
	});
	Sizes.hasMany(SizesCategoriesMap, {
		foreignKey: {
			name: "size_id",
		},
	});
	SizesCategoriesMap.belongsTo(Categories, {
		foreignKey: {
			name: "category_id",
		},
	});
	SizesCategoriesMap.belongsTo(Sizes, {
		foreignKey: {
			name: "size_id",
		},
	});

	// Curations < Products => One-To-Many
	// Curations.hasMany(Products);
	// Products.belongsTo(Curations);

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
	Chatrooms.hasMany(Messages, {
		foreignKey: {
			name: "chatroom_id",
		},
	});
	Messages.belongsTo(Chatrooms, {
		foreignKey: {
			name: "chatroom_id",
		},
	});

	// Chatrooms - Messages One-To-One
	Messages.hasOne(Chatrooms, {
		as: "last_message_asssociation",
		foreignKey: "last_message",
	});
	Chatrooms.belongsTo(Messages, {
		as: "last_message_asssociation",
		foreignKey: "last_message",
	});

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

	// Users <> Designers Many-To-Many through FollowedDesigners
	Users.belongsToMany(Designers, {
		through: {
			model: FollowedDesigners,
		},
		foreignKey: "user_name",
		otherKey: "designer_id",
	});
	Designers.belongsToMany(Users, {
		through: {
			model: FollowedDesigners,
		},
		foreignKey: "designer_id",
		otherKey: "user_name",
	});
	Users.hasMany(FollowedDesigners, {
		foreignKey: {
			name: "user_name",
		},
	});
	Designers.hasMany(FollowedDesigners, {
		foreignKey: {
			name: "designer_id",
		},
	});
	FollowedDesigners.belongsTo(Users, {
		foreignKey: {
			name: "user_name",
		},
	});
	FollowedDesigners.belongsTo(Designers, {
		foreignKey: {
			name: "designer_id",
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

	// Products <> Curations Many-To-Many through ProductsCurationsMap
	Products.belongsToMany(Curations, {
		through: {
			model: ProductsCurationsMap,
		},
		foreignKey: "product_id",
		otherKey: "curation_id",
	});
	Curations.belongsToMany(Products, {
		through: {
			model: ProductsCurationsMap,
		},
		foreignKey: "curation_id",
		otherKey: "product_id",
	});
	Products.hasMany(ProductsCurationsMap, {
		foreignKey: {
			name: "product_id",
		},
	});
	Curations.hasMany(ProductsCurationsMap, {
		foreignKey: {
			name: "curation_id",
		},
	});
	ProductsCurationsMap.belongsTo(Products, {
		foreignKey: {
			name: "product_id",
		},
	});
	ProductsCurationsMap.belongsTo(Curations, {
		foreignKey: {
			name: "curation_id",
		},
	});
};

export default applyAssociations;
