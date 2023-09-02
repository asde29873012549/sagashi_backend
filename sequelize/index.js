import sequelize from "../config/db.js";
import associations from "./associations.js";

import categories from "./models/categories.model.js";
import chatrooms from "./models/chatrooms.model.js";
import designers from "./models/designers.model.js";
import discounts from "./models/discounts.model.js";
import featuredDesigners from "./models/featuredDesigners.model.js";
import follows from "./models/follows.model.js";
import likes from "./models/likes.model.js";
import messages from "./models/messages.model.js";
import notifications from "./models/notifications.model.js";
import offers from "./models/offers.model.js";
import products from "./models/products.model.js";
import recentlyViewed from "./models/recentlyViewed.model.js";
import shoppingCart from "./models/shoppingCart.model.js";
import sizes from "./models/sizes.model.js";
import userAddress from "./models/userAddress.model.js";
import users from "./models/users.model.js";
import tags from "./models/tags.model.js";
import productTags from "./models/productTags.model.js";

const modelDefiners = [
	categories,
	chatrooms,
	designers,
	discounts,
	featuredDesigners,
	follows,
	likes,
	messages,
	notifications,
	offers,
	products,
	recentlyViewed,
	shoppingCart,
	sizes,
	userAddress,
	users,
	tags,
	productTags,
];

modelDefiners.forEach((model) => {
	model(sequelize);
});

associations(sequelize);
/*
async function syncDB() {
	await sequelize.sync();
}

syncDB();
*/

const Model = sequelize.models;

export default sequelize;
export { Model };
