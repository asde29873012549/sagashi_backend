import { BaseError as SequelizeGenericError } from "sequelize";
import sequelize, { Model } from "../../../sequelize/index.js";
import createFile from "../../utils/gcp/cloudStorage.js";
import {
	DatabaseError,
	StorageError,
	ValidationError,
	UnknownError,
} from "../../utils/api_error.js";

export default async function dbSaveListingDraft(req, res) {
	const products = Model.Products;
	const multer_handled_img = req.files;

	const img = Object.values(multer_handled_img).map((item) => item[0]);

	const {
		department_id,
		category_id,
		subCategory_id,
		item_name,
		designer_id,
		size_id,
		color,
		condition,
		price,
		desc,
		tags,
	} = req.body;

	const jwtUsername = res.locals.user;

	const rest_of_image = {};
	let fileUriArray;

	const regex = /[^\w\d]+/g;
	const slug = tags && tags.split(regex);
	const purifyTags = slug && slug.join("#");

	const numericPrice = price && Number(price);
	if (Number.isNaN(numericPrice)) {
		throw new ValidationError();
	}

	if (img && img.length > 0) {
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
	}

	const primary_image = fileUriArray && fileUriArray[0]?.fileUri;
	const secondary_image =
		Object.keys(rest_of_image).length > 0 ? JSON.stringify(rest_of_image) : null;

	try {
		const result = await sequelize.transaction(async (t) => {
			const data = await products.create(
				{
					prod_cat_ref_start: subCategory_id || category_id || department_id,
					seller_name: jwtUsername,
					name: item_name,
					designer_id,
					size_id,
					color,
					condition,
					price: numericPrice,
					desc,
					tags: purifyTags,
					status: 0,
					primary_image,
					secondary_image,
				},
				{ transaction: t },
			);

			return data;
		});

		return result;
	} catch (err) {
		if (err instanceof SequelizeGenericError) {
			throw new DatabaseError(err.name);
		}
		throw new UnknownError();
	}
}
