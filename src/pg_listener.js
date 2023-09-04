import * as dotenv from "dotenv";
import createSubscriber from "pg-listen";
import mq_listener from "../rabbitmq/listener.js";

dotenv.config();

const host = process.env.PG_HOST;
const database = process.env.PG_DB;
const port = process.env.PG_PORT;
const user = process.env.PG_USER;
const password = process.env.PG_PW;

const pg_channel = process.env.PG_NOTIFY_CHANNEL;

const subscriber = createSubscriber({
	host,
	port,
	database,
	user,
	password,
});

subscriber.notifications.on(pg_channel, async (payload) => {
	try {
		await mq_listener(payload);
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
});

subscriber.events.on("error", (error) => {
	console.error("Fatal database connection error:", error);
	process.exit(1);
});

process.on("exit", () => {
	subscriber.close();
});

await subscriber.connect();
await subscriber.listenTo(pg_channel);

console.log(`postgres client start listening to chanel ${pg_channel}`);
