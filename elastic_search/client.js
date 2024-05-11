import * as dotenv from "dotenv";
import fs from "fs";
import { Client } from "@elastic/elasticsearch";

dotenv.config();

const { NODE_ENV } = process.env;

const client = new Client({
	node: process.env.ES_SERVER,
	auth: {
		username: process.env.ES_USERNAME,
		password: process.env.ES_PASSWORD,
	},
	tls: {
		ca: NODE_ENV === "production" ? null : fs.readFileSync("./ca.crt"),
		rejectUnauthorized: NODE_ENV !== "production",
	},
});

export default client;
