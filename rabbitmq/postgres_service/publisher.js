import * as dotenv from "dotenv";
import mq_connect from "../client.js";

dotenv.config();

const mq_queue = process.env.RABBITMQ_QUEUE;

async function sysnc_product(payload) {
	const connection = await mq_connect();
	try {
		const channel = await connection.createChannel();
		await channel.assertQueue(mq_queue);

		channel.sendToQueue(mq_queue, Buffer.from(JSON.stringify(payload)));
	} catch (err) {
		console.log(err);
		connection.close();
	}
}

export default sysnc_product;
