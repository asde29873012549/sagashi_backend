import crypto from "crypto";
import { Storage } from "@google-cloud/storage";


const bucketName = 'your-unique-bucket-name';
const storage = new Storage()

async function createFile(file, type) {
	const fileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

	await storage.bucket(bucketName).file(fileName).save(file, {
		resumable: false,
		contentType:type
	});

	const fileUri = `https://storage.googleapis.com/${bucketName}/${fileName}`

	return fileUri
	
}


export default createFile