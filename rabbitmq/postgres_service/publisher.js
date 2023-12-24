import * as dotenv from "dotenv";
import mq_connect from "../client.js";

dotenv.config();

const product_sync_queue = process.env.PRODUCT_SYNC_QUEUE;

async function sysnc_product(payload) {
	const connection = await mq_connect();
	try {
		const channel = await connection.createChannel();
		await channel.assertQueue(product_sync_queue);

		channel.sendToQueue(product_sync_queue, Buffer.from(JSON.stringify(payload)));
	} catch (err) {
		console.log(err);
		connection.close();
	}
}

export default sysnc_product;
