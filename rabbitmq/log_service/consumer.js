import * as dotenv from "dotenv";
import { BaseError as SequelizeGenericError } from "sequelize";
import mq_connect from "../client.js";
import sequelize, { Model } from "../../sequelize/index.js";

dotenv.config();


const log_exchange = process.env.LOG_EXCHANGE;
const topic = "log.recentlyViewed"

async function mq_consumer() {
	console.log("rabbitmq log_consumer start consuming");
	const recentlyViewed = Model.RecentlyViewed;
	const connection = await mq_connect();
	const channel = await connection.createChannel();
	const { queue } = await channel.assertQueue(topic, { durable: true });
	await channel.bindQueue(queue, log_exchange, topic);
	console.log(`finish binding queue ${queue} to exchange ${log_exchange} with topic ${topic}`);

	try {
		channel.consume(
			queue,
			async (message) => {
				const res = JSON.parse(message.content.toString());
				if (res) {
					const { product_id, username } = res;

					const recordRecentlyViewed = await sequelize.transaction(async (t) => {
						const record = await recentlyViewed.upsert(
							{
								product_id,
								user_name: username,
							},
							{ transaction: t },
						);
						return record;
					});

					if (recordRecentlyViewed) channel.ack(message);
				}
			},
			{
				noAck: false,
			},
		);
	} catch (err) {
		if (err instanceof SequelizeGenericError) {
			console.log(err);
		} else {
			console.log(err);
			// connection.close()
		}
	}
}

mq_consumer();
