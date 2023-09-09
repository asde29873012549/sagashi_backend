import * as dotenv from "dotenv";
import Response from "../utils/response_template.js";
import jwt from "jsonwebtoken";

dotenv.config();

const accesss_token_secret = process.env.ACCESS_TOKEN_SECRET;

export default function tokenAuthentication(req, res, next) {
	const headerStr = req.headers.authorization;

	if (!headerStr) {
		return res.status(401).json(new Response({ message: "User access unauthenticated" }).fail());
	}

	const token = headerStr.split(" ")[1];

	return jwt.verify(token, accesss_token_secret, (err, user) => {
		if (err)
			return res.status(401).json(new Response({ message: "User access unauthenticated" }).fail());
		res.locals.user = user.username;
		return next();
	});
}
