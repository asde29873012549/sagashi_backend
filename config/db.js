import * as dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const host = process.env.PG_HOST;
const db = process.env.PG_DB;
const user = process.env.PG_USER;
const password = process.env.PG_PW;

const sequelize = new Sequelize(db, user, password, {
	host,
	dialect: "postgres",
	pool: {
		max: 10,
		min: 1,
		acquire: 30000,
		idle: 10000,
	},
});

export default sequelize;
