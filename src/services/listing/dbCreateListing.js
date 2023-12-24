import { BaseError as SequelizeGenericError } from "sequelize";
import sequelize, { Model } from "../../../sequelize/index.js";
import createFile from "../../utils/gcp/cloudStorage.js";
import colorData from "../../data/color.js";
import conditionData from "../../data/condition.js";
import publish_notification from "../../../rabbitmq/notification_service/publisher.js";
import { getNowISODate } from "../../utils/date.js";
import {
	DatabaseError,
	StorageError,
	ValidationError,
	UnknownError,
} from "../../utils/api_error.js";

export default async function dbCreateListing(req, res) {
	const multer_handled_img = req.files;
	const img = Object.values(multer_handled_img).map((item) => item[0]);

	const {
		department,
		category,
		subCategory,
		subCategory_id,
		item_name,
		designer,
		designer_id,
		size,
		size_id,
		color,
		condition,
		price,
	} = req.body;

	const jwtUsername = res.locals.user;

	const rest_of_image = {};
	let fileUriArray;

	const { desc, tags, ...rest_body } = req.body;

	// check for all required fields except desc & tags
	Object.values(rest_body).forEach((field) => {
		if (!field || field === " ") {
			throw new ValidationError();
		}
	});

	// Check for invalid color & condition data
	const isColorValid = colorData.find((element) => element === color);
	const isConditionValid = conditionData.find((element) => element === condition);

	if (!isColorValid || !isConditionValid) throw new ValidationError();

	try {
		fileUriArray = await Promise.all(img.map((image) => createFile(image)));
		if (fileUriArray.length > 1) {
			fileUriArray.slice(1).forEach((fileObj) => {
				rest_of_image[fileObj.fieldName] = fileObj.fileUri;
			});
		}
	} catch (err) {
		throw new StorageError();
	}

	const regex = /[^\w\d]+/g;
	const slug = tags && tags.split(regex);
	const purifyTags = slug && slug.join("#");

	const numericPrice = Number(price);
	if (Number.isNaN(numericPrice)) {
		throw new ValidationError();
	}

	const primary_image = fileUriArray[0]?.fileUri;
	const secondary_image =
		Object.keys(rest_of_image).length > 0 ? JSON.stringify(rest_of_image) : null;

	const products = Model.Products;
	const products_to_be_sync = Model.Products_to_be_sync;
	const notification = Model.Notifications;
	const notificationReceiverMap = Model.NotificationReceiverMap;
	const follows = Model.Follows;

	let id = null;

	try {
		const result = await sequelize.transaction(async (t) => {
			const prod = await products.create(
				{
					seller_name: jwtUsername,
					name: item_name,
					prod_cat_ref_start: subCategory_id,
					stock: 1,
					size_id,
					designer_id,
					color,
					condition,
					price: numericPrice,
					desc,
					tags: purifyTags,
					primary_image,
					secondary_image,
				},
				{ transaction: t },
			);

			if (!prod) return null;

			await products_to_be_sync.create(
				{
					prod_id: Number(prod.dataValues.id),
					seller_name: jwtUsername,
					name: item_name,
					department,
					category,
					sub_category: subCategory,
					designer,
					stock: 1,
					price: numericPrice,
					desc,
					primary_image,
					secondary_image,
					status: "1",
					color,
					discount: 0,
					condition,
					tags,
					size,
				},
				{ transaction: t },
			);

			const followers = await follows.findAll({
				attributes: ["follower_name"],
				where: {
					user_name: jwtUsername,
				},
			});

			const notifications = await notification.create({
				sender_name: jwtUsername,
				type: "notification.uploadListing",
				image: primary_image,
				content: {
					listing_name: item_name,
				},
				link: `/shop/${prod.dataValues.id}`,
			});

			if (notifications) id = notifications.id;

			const notificationReceiverMapCreateArray = followers.map((follower) => ({
				notification_id: id,
				username: follower.follower_name,
			}));

			await notificationReceiverMap.bulkCreate(notificationReceiverMapCreateArray);

			return prod;
		});

		if (result) {
			await publish_notification({
				id,
				type: "notification.uploadListing",
				username: jwtUsername,
				listing_name: item_name,
				image: primary_image,
				created_at: getNowISODate(),
				link: `/shop/${result.id}`,
			});
		}

		return result;
	} catch (err) {
		console.log(err);
		if (err instanceof SequelizeGenericError) {
			throw new DatabaseError(err.name);
		}
		throw new UnknownError();
	}
}
