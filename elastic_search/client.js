import fs from "fs";
import * as dotenv from "dotenv";
import { Client } from "@elastic/elasticsearch";

dotenv.config();

const { ES_SERVER, ES_USERNAME, ES_PASSWORD } = process.env;

const client = new Client({
	node: ES_SERVER,
	auth: {
		username: ES_USERNAME,
		password: ES_PASSWORD,
	},
	tls: {
		ca: fs.readFileSync("./config/ca.crt"),
		rejectUnauthorized: true,
	},
});

export default client;
