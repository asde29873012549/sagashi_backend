import * as dotenv from "dotenv";
import amqp from "amqplib";

dotenv.config();

const rabbitmq_connection_str = process.env.RABBITMQ_CONN;

async function connect() {
	try {
		const connection = await amqp.connect(rabbitmq_connection_str);
		connection.on("error", (err) => {
			console.error("amqplib connection error", err);
		  });
		  
		connection.on("close", () => {
			console.log("amqplib connection has closed...");
		});
		console.log("Rabbitmq connection established");
		return connection;
	} catch (err) {
		console.log(`Failed to establish rabbitmq connection:`, err);
		return null;
	}
}

export default connect;
