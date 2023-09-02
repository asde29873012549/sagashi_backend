import fs from "fs";
import * as dotenv from "dotenv";
import { Client } from "@elastic/elasticsearch";

dotenv.config();

const client = new Client({
	node: "https://localhost:9200",
	auth: {
		username: process.env.ES_USERNAME,
		password: process.env.ES_PASSWORD,
	},
	tls: {
		ca: fs.readFileSync("./config/ca.crt"),
		rejectUnauthorized: true,
	},
});

export default client;
