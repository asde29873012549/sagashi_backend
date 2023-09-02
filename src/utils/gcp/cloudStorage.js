import { Storage } from "@google-cloud/storage";
import storageNameGenerator from "./storageNameGenerator.js";

const bucketName = "sagashi_products_data";
const storage = new Storage();

async function createFile(file, type) {
	const fileName = storageNameGenerator();
	await storage.bucket(bucketName).file(fileName).save(file, {
		resumable: false,
		contentType: type,
	});

	const fileUri = `https://storage.googleapis.com/${bucketName}/${fileName}`;

	return fileUri;
}

export default createFile;
