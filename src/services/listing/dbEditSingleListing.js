import { DateTime } from "luxon";
import { BaseError as SequelizeGenericError } from "sequelize";
import sequelize, { Model } from "../../../sequelize/index.js";
import colorData from "../../data/color.js";
import createFile from "../../utils/gcp/cloudStorage.js";
import conditionData from "../../data/condition.js";
import requiredFieldValidation from "../../utils/requiredFieldValidation.js";
import {
	DatabaseError,
	StorageError,
	ValidationError,
	UnknownError,
} from "../../utils/api_error.js";

function generateSecondaryImageObj(rest_body, imageObj) {
	const secondary_image = {};
	Object.keys(imageObj).forEach((key) => {
		if (key !== "primary_image") {
			secondary_image[key] = rest_body[key] || imageObj[key];
		}
	});
	return JSON.stringify(secondary_image);
};

export default async function dbEditSingleListing(req, res) {
	const multer_handled_img = req.files;

	const img = Object.values(multer_handled_img).map((item) => item[0]);

	const jwtUsername = res.locals.user;

	const imageObj = {};
	let fileUriArray;

	const { isDraft, desc, tags, primary_image, ...rest_body } = req.body;
	const {
		item_name,
		price,
		condition,
		subCategory_id,
		size_id,
		color,
		department,
		category,
		subCategory,
		designer,
		size,
	} = rest_body;

	// check for all required fields except desc & tags
	requiredFieldValidation(rest_body);

	// Check for invalid color & condition data
	const isColorValid = colorData.find((element) => element === color);
	const isConditionValid = conditionData.find((element) => element === condition);

	if (!isColorValid || !isConditionValid) throw new ValidationError();

	try {
		fileUriArray = await Promise.all(img.map((image) => createFile(image)));
		fileUriArray.forEach((fileObj) => {
			imageObj[fileObj.fieldName] = fileObj.fileUri;
		});
	} catch (err) {
		throw new StorageError();
	}

	const regex = /[^\w\d]+/g;
	const slug = tags?.split(regex);
	const purifyTags = slug?.join("#");

	const numericPrice = Number(price);
	if (Number.isNaN(numericPrice)) {
		throw new ValidationError();
	}

	const secondary_image = generateSecondaryImageObj();

	const products = Model.Products;
	const products_to_be_sync = Model.Products_to_be_sync;

	try {
		const result = await sequelize.transaction(async (t) => {
			const updatedRow = await products.update(
				{
					name: item_name,
					condition,
					price: numericPrice,
					desc,
					tags: purifyTags,
					primary_image: primary_image || imageObj.primary_image,
					secondary_image,
					prod_cat_ref_start: subCategory_id,
					size_id,
					color,
					status: "1",
				},
				{
					where: {
						id: req.params.id,
					},
				},
				{ transaction: t },
			);

			if (!updatedRow) return null;

			const currentTime = DateTime.now().setZone("Asia/Taipei");
			const formattedCurrrentTime = currentTime.toFormat("yyyy-MM-dd HH:mm:ss");

			await products_to_be_sync.create(
				{
					prod_id: req.params.id,
					seller_name: jwtUsername,
					name: item_name,
					price: numericPrice,
					desc,
					primary_image: primary_image || imageObj.primary_image,
					secondary_image,
					condition,
					tags,
					updated_at: isDraft ? null : formattedCurrrentTime,
					department,
					category,
					sub_category: subCategory,
					designer,
					stock: 1,
					status: "1",
					color,
					discount: 0,
					size,
				},
				{
					where: {
						prod_id: req.params.id,
					},
				},
				{ transaction: t },
			);

			return updatedRow;
		});

		return result;
	} catch (err) {
		if (err instanceof SequelizeGenericError) {
			throw new DatabaseError(err.name);
		}
		throw new UnknownError();
	}
}
