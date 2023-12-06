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
		NotificationReceiverMap,
	} = sequelize.models;

	// Notifications <> Users => Many-To-Many through NotificationReceiverMap
	Notifications.hasMany(NotificationReceiverMap, {
		foreignKey: {
			name: "notification_id",
		},
	});
	Users.hasMany(NotificationReceiverMap, {
		foreignKey: {
			name: "username",
		},
	});
	NotificationReceiverMap.belongsTo(Notifications, {
		foreignKey: {
			name: "notification_id",
		},
	});
	NotificationReceiverMap.belongsTo(Users, {
		foreignKey: {
			name: "username",
		},
	});
	Notifications.belongsToMany(Users, {
		as: "notification_receivers",
		through: NotificationReceiverMap,
		foreignKey: "notification_id",
		otherKey: "username",
	});
	Users.belongsToMany(Notifications, {
		as: "notification_receivers",
		through: NotificationReceiverMap,
		foreignKey: "username",
		otherKey: "notification_id",
	});

	// Categories <> Sizes => Many-To-Many through SizesCategoriesMap
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
	Categories.belongsToMany(Sizes, {
		through: SizesCategoriesMap,
		foreignKey: "category_id",
		otherKey: "size_id",
	});
	Sizes.belongsToMany(Categories, {
		through: SizesCategoriesMap,
		foreignKey: "size_id",
		otherKey: "category_id",
	});

	// Users <> Designers Many-To-Many through FollowedDesigners
	Users.hasMany(FollowedDesigners, {
		as: "userFollowedDesigners",
		foreignKey: {
			name: "user_name",
		},
	});
	Designers.hasMany(FollowedDesigners, {
		as: "designersBeingFollowedUsers",
		foreignKey: {
			name: "designer_id",
		},
	});
	FollowedDesigners.belongsTo(Users, {
		as: "userFollowedDesigners",
		foreignKey: {
			name: "user_name",
		},
	});
	FollowedDesigners.belongsTo(Designers, {
		as: "designersBeingFollowedUsers",
		foreignKey: {
			name: "designer_id",
		},
	});
	Users.belongsToMany(Designers, {
		through: FollowedDesigners,
		foreignKey: "user_name",
		otherKey: "designer_id",
	});
	Designers.belongsToMany(Users, {
		through: FollowedDesigners,
		foreignKey: "designer_id",
		otherKey: "user_name",
	});

	// Products <> Curations Many-To-Many through ProductsCurationsMap
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
	Products.belongsToMany(Curations, {
		through: ProductsCurationsMap,
		foreignKey: "product_id",
		otherKey: "curation_id",
	});
	Curations.belongsToMany(Products, {
		through: ProductsCurationsMap,
		foreignKey: "curation_id",
		otherKey: "product_id",
	});

	// Users <> Products Many-To-Many through Offers
	Users.hasMany(Offers, {
		as: "userOffers",
		foreignKey: {
			name: "user_name",
		},
	});
	Products.hasMany(Offers, {
		as: "productOffers",
		foreignKey: {
			name: "product_id",
		},
	});
	Offers.belongsTo(Users, {
		as: "userOffers",
		foreignKey: {
			name: "user_name",
		},
	});
	Offers.belongsTo(Products, {
		as: "productOffers",
		foreignKey: {
			name: "product_id",
		},
	});
	Users.belongsToMany(Products, {
		through: Offers,
		foreignKey: "user_name",
		otherKey: "product_id",
	});
	Products.belongsToMany(Users, {
		through: Offers,
		foreignKey: "product_id",
		otherKey: "user_name",
	});

	// Users <> Products Many-To-Many through RecentlyViewed
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
	Users.belongsToMany(Products, {
		through: RecentlyViewed,
		foreignKey: "user_name",
		otherKey: "product_id",
	});
	Products.belongsToMany(Users, {
		through: RecentlyViewed,
		foreignKey: "product_id",
		otherKey: "user_name",
	});

	// Users <> Products Many-To-Many through ShoppingCart
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
	Users.belongsToMany(Products, {
		through: ShoppingCart,
		foreignKey: "user_name",
		otherKey: "product_id",
	});
	Products.belongsToMany(Users, {
		through: ShoppingCart,
		foreignKey: "product_id",
		otherKey: "user_name",
	});

	// Users <> Products Many-To-Many through Likes
	Users.hasMany(Likes, {
		as: "userLikedProducts",
		foreignKey: {
			name: "user_name",
		},
	});
	Products.hasMany(Likes, {
		as: "LikesProducts",
		foreignKey: {
			name: "product_id",
		},
	});
	Likes.belongsTo(Users, {
		as: "userLikedProducts",
		foreignKey: {
			name: "user_name",
		},
	});
	Likes.belongsTo(Products, {
		as: "LikesProducts",
		foreignKey: {
			name: "product_id",
		},
	});
	Users.belongsToMany(Products, {
		through: Likes,
		foreignKey: "user_name",
		otherKey: "product_id",
	});
	Products.belongsToMany(Users, {
		through: Likes,
		foreignKey: "product_id",
		otherKey: "user_name",
	});

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

	// Designers - FeaturedDesingers One-To-One
	Designers.hasOne(FeaturedDesigners);
	FeaturedDesigners.belongsTo(Designers);

	// Designers < Products One-To-Many
	Designers.hasMany(Products);
	Products.belongsTo(Designers);

	// Sizes < Products One-To-Many
	Sizes.hasMany(Products);
	Products.belongsTo(Sizes);

	// Discounts < Products One-To-Many
	Discounts.hasMany(Products);
	Products.belongsTo(Discounts);

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

	// Users < Notifications One-To-Many
	Users.hasMany(Notifications, {
		foreignKey: {
			name: "sender_name",
		},
	});
	Notifications.belongsTo(Users, {
		foreignKey: {
			name: "sender_name",
		},
	});

	// Users < Chatrooms => One-To-Many
	Users.hasMany(Chatrooms, {
		as: "last_sent_user",
		foreignKey: {
			name: "last_sent_user_name",
		},
	});
	Users.hasMany(Chatrooms, {
		as: "seller",
		foreignKey: {
			name: "seller_name",
		},
	});
	Users.hasMany(Chatrooms, {
		as: "buyer",
		foreignKey: {
			name: "buyer_name",
		},
	});
	Chatrooms.belongsTo(Users, {
		as: "last_sent_user",
		foreignKey: {
			name: "last_sent_user_name",
		},
	});
	Chatrooms.belongsTo(Users, {
		as: "seller",
		foreignKey: {
			name: "seller_name",
		},
	});
	Chatrooms.belongsTo(Users, {
		as: "buyer",
		foreignKey: {
			name: "buyer_name",
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
		as: "chatroomMessages",
		foreignKey: {
			name: "chatroom_id",
		},
	});
	Messages.belongsTo(Chatrooms, {
		as: "chatroomMessages",
		foreignKey: {
			name: "chatroom_id",
		},
	});

	// Chatrooms - Messages One-To-One
	/* Messages.hasOne(Chatrooms, {
		as: "last_message_asssociation",
		foreignKey: "last_message",
		constraints: false,
	}); */
	Chatrooms.belongsTo(Messages, {
		as: "last_message_asssociation",
		foreignKey: "last_message",
		constraints: false,
	});
};

export default applyAssociations;
