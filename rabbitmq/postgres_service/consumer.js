import * as dotenv from "dotenv";
import mq_connect from "../client.js";

import es_client from "../../elastic_search/client.js";

dotenv.config();

const product_index = process.env.ES_PRODUCT_INDEX;
const product_sync_queue = process.env.PRODUCT_SYNC_QUEUE;

async function mq_consumer() {
	console.log("rabbitmq product_sync consumer start consuming");
	const connection = await mq_connect();
	try {
		const channel = await connection.createChannel();
		await channel.assertQueue(product_sync_queue);

		channel.consume(
			product_sync_queue,
			async (message) => {
				const res = JSON.parse(message.content.toString());
				if (res) {
					const { prod_id, sub_category, id, ...rest_data } = res.data;
					let create_or_update = null;

					if (!rest_data.updated_at) {
						console.log("create");
						create_or_update = await es_client.index({
							index: product_index,
							id: prod_id,
							document: {
								prod_id,
								subCategory: sub_category,
								...rest_data,
							},
						});
					} else {
						console.log("update");
						create_or_update = await es_client.update({
							index: product_index,
							id: prod_id,
							doc: {
								prod_id,
								subCategory: sub_category,
								...rest_data,
							},
						});
					}

					if (create_or_update) channel.ack(message);
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
