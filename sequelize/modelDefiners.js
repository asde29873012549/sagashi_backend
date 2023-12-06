import categories from "./models/categories.model.js";
import curations from "./models/curations.model.js";
import chatrooms from "./models/chatrooms.model.js";
import designers from "./models/designers.model.js";
import discounts from "./models/discounts.model.js";
import featuredDesigners from "./models/featuredDesigners.model.js";
import followedDesigners from "./models/followedDesigners.model.js";
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
import faqs from "./models/faqs.model.js";
import products_to_be_sync from "./models/products_to_be_sync.model.js";
import sizes_categories_map from "./models/sizes_categories_map.model.js";
import products_curations_map from "./models/products_curations_map.model.js";
import notification_receiver_map from "./models/notification_receiver_map.model.js";

const modelDefiners = [
	categories,
	sizes,
	users,
	notifications,
	designers,
	followedDesigners,
	discounts,
	products,
	userAddress,
	curations,
	faqs,
	messages,
	chatrooms,
	featuredDesigners,
	follows,
	likes,
	offers,
	recentlyViewed,
	shoppingCart,
	products_to_be_sync,
	sizes_categories_map,
	products_curations_map,
	notification_receiver_map,
];

export default modelDefiners;
