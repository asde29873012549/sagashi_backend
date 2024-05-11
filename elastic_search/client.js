import * as dotenv from "dotenv";
import fs from "fs";
import { Client } from "@elastic/elasticsearch";

dotenv.config();

const { NODE_ENV, ES_SERVER, ES_USERNAME, ES_PASSWORD } = process.env;

const client = new Client({
	node: ES_SERVER,
	auth: {
		username: ES_USERNAME,
		password: ES_PASSWORD,
	},
	tls: {
		ca: NODE_ENV === "production" ? null : fs.readFileSync("./ca.crt"),
		rejectUnauthorized: NODE_ENV !== "production",
	},
});

export default client;
