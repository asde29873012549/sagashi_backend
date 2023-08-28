import { Model } from "../../sequelize/index.js";
import createFile from "../utils/gcp/cloudStorage.js";
import { DatabaseError, StorageError } from "../utils/api_error.js";

export default async function dbCreateListing(req) {

	console.log(req)

	const img = req.files
	const {
		cat,
		size,
		designer,
		item_name,
		color,
		condition,
		price,
		desc,
		tags
	} = req.body

	const products = Model.Products;
	let fileUriArray;
	const secondary_image = {}

	try {
		fileUriArray = await Promise.all(img.map(image => createFile(image)))
		if (fileUriArray.length > 1) {
			fileUriArray.slice(1).forEach((file, index) => {
				secondary_image[`${item_name}_${index}`] = file
			})
		}

	} catch (err) {
		console.log(err)
		throw new StorageError()
	}

	try {
		const result = await products.create({
			name:item_name,
			prod_cat_ref_start:cat,
			stock:1,
			size_id:size,
			designer_id:designer,
			color_id:color,
			condition_id:condition,
			price,
			desc,
			primary_image:fileUriArray[0],
			secondary_image:JSON.stringify(secondary_image)
		})

		

		if (!result) {
			throw new DatabaseError()
		}
	} catch (err) {
		throw new DatabaseError()
	}
		

		


}