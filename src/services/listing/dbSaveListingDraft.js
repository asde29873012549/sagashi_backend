import { BaseError as SequelizeGenericError } from "sequelize";
import sequelize, { Model } from "../../../sequelize/index.js";
import createFile from "../../utils/gcp/cloudStorage.js";
import {
	DatabaseError,
	StorageError,
	ValidationError,
	UnknownError,
} from "../../utils/api_error.js";

export default async function dbSaveListingDraft(req) {
	const products = Model.Products;
	const img = req.files;

	const {
		department_id,
		category_id,
		subCategory_id,
		seller_name,
		item_name,
		designer_id,
		size_id,
		color_id,
		condition_id,
		price,
		desc,
		tags,
	} = req.body;
	const rest_of_image = {};
	let fileUriArray;

	const regex = /[^\w\d]+/g;
	const slug = tags && tags.split(regex);
	const purifyTags = slug && slug.join("#");

	const numericPrice = price && Number(price);
	if (Number.isNaN(numericPrice)) {
		throw new ValidationError();
	}

	if (img.length > 0) {
		try {
			fileUriArray = await Promise.all(img.map((image) => createFile(image.buffer)));
			if (fileUriArray.length > 1) {
				fileUriArray.slice(1).forEach((file, index) => {
					rest_of_image[`image_${index}`] = file;
				});
			}
		} catch (err) {
			throw new StorageError();
		}
	}

	const primary_image = fileUriArray && fileUriArray[0];
	const secondary_image =
		Object.keys(rest_of_image).length > 0 ? JSON.stringify(rest_of_image) : null;

	try {
		const result = await sequelize.transaction(async (t) => {
			const data = await products.create(
				{
					prod_cat_ref_start: subCategory_id || category_id || department_id,
					seller_name,
					name: item_name,
					designer_id,
					size_id,
					color_id,
					condition_id,
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
