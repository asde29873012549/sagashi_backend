import * as dotenv from "dotenv";
import { Client } from "@elastic/elasticsearch";

dotenv.config();

const client = new Client({
	node: process.env.ES_SERVER,
	auth: {
		username: process.env.ES_USERNAME,
		password: process.env.ES_PASSWORD,
	},
	tls: {
		// ca: process.env.ES_CRT_SECRET,
		rejectUnauthorized: false,
	},
});

export default client;
