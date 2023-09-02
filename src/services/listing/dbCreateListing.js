import sequelize, { Model } from "../../../sequelize/index.js";
import createFile from "../../utils/gcp/cloudStorage.js";
import { DatabaseError, StorageError } from "../../utils/api_error.js";

export default async function dbCreateListing(req) {
	const products = Model.Products;
	const img = req.files;
	const { cat, size, designer, item_name, color, condition, price, desc, tags } = req.body;
	const secondary_image = {};
	let fileUriArray;

	try {
		fileUriArray = await Promise.all(img.map((image) => createFile(image.buffer)));
		if (fileUriArray.length > 1) {
			fileUriArray.slice(1).forEach((file, index) => {
				secondary_image[`image_${index}`] = file;
			});
		}
	} catch (err) {
		throw new StorageError();
	}

	const regex = /[^\w\d]+/g;
	const slug = tags.split(regex);
	const purifyTags = slug.join("#");

	try {
		const result = await sequelize.transaction(async (t) => {
			const prod = await products.create(
				{
					name: item_name,
					prod_cat_ref_start: cat,
					stock: 1,
					size_id: size,
					designer_id: designer,
					color_id: color,
					condition_id: condition,
					price: Number(price),
					desc,
					tags: purifyTags,
					primary_image: fileUriArray[0],
					secondary_image: JSON.stringify(secondary_image),
				},
				{ transaction: t },
			);

			return prod;
		});

		if (!result) {
			throw new DatabaseError();
		} else {
			return "Listing upload sucessfully";
		}
	} catch (err) {
		throw new DatabaseError();
	}
}
