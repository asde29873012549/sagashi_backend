import * as dotenv from "dotenv";
import Response from "../utils/response_template.js";
import jwt from "jsonwebtoken";

dotenv.config();

const accesss_token_secret = process.env.ACCESS_TOKEN_SECRET;

export default function tokenAuthentication(req, res, next) {
	const token = req.headers.authorization;

	if (!token) {
		res.status(401).json(new Response("User access unauthenticated").fail());
	}

	jwt.verify(token, accesss_token_secret, (err, user) => {
		if (err) return res.status(401).json(new Response("User access unauthenticated").fail());
		res.locals.user = user.username;
		return next();
	});
}
