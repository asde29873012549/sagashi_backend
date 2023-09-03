import * as dotenv from "dotenv";
import mq_connect from "./client.js";

import es_client from "../elastic_search/client.js"

dotenv.config();

const product_index = process.env.ES_PRODUCT_INDEX
const mq_queue = process.env.RABBITMQ_QUEUE

async function mq_consumer() {
	console.log('rabbitmq consumer start consuming')
	const connection = await mq_connect();
	try {
		const channel = await connection.createChannel();
		await channel.assertQueue(mq_queue);

		channel.consume(
			mq_queue,
			async (message) => {
				const res = JSON.parse(message.content.toString());
				if (res) {
					const {
						prod_id, 
						sub_category, 
						...rest_data
					} = res.data

					const create_doc = await es_client.index({
						index: product_index,
						document: {
							id:prod_id,
							subCategory: sub_category,
							...rest_data
						}
					})

					if (create_doc) channel.ack(message);
				}
			},
			{
				noAck: false,
			},
		);
	} catch (err) {
		console.log(err);
		// connection.close()
	}
}

mq_consumer();