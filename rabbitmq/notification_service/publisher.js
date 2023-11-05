import * as dotenv from "dotenv";
import mq_connect from "../client.js";

dotenv.config();

const mq_queue = process.env.NOTIFICATION_QUEUE;
const mq_exchange = process.env.NOTIFICATION_EXCHANGE;

async function publish_notification(payload) {
	const connection = await mq_connect();
	try {
		const channel = await connection.createChannel();

		await channel.assertExchange(mq_exchange, "topic", {
			durable: true,
		});

		const topics = [
			"notification.like",
			"notification.follow",
			"notification.uploadListing",
			"notification.order",
		];

		await Promise.all(
			topics.map(async (topic) => {
				const { queue } = await channel.assertQueue(topic, { durable: true });
				await channel.bindQueue(queue, mq_exchange, topic);
				console.log(`finish binding queue ${queue} to exchange ${mq_exchange} with topic ${topic}`);
				return queue;
			}),
		);

		channel.publish(
			mq_exchange,
			payload.type /* routing key */,
			Buffer.from(JSON.stringify(payload)),
		);
		console.log(`finish publishing to exchange ${mq_exchange} with routing key ${payload.type}`);
	} catch (err) {
		console.log(err);
		connection.close();
	}
}

export default publish_notification;
