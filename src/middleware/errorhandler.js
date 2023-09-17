import { MulterError } from "multer";
import { AppError } from "../utils/api_error.js";
import Response from "../utils/response_template.js";

export default function error_handler(err, req, res, next) {
	if (err instanceof AppError) {
		return res.status(err.status || 500).json(new Response(err).fail());
	}

	if (err instanceof MulterError) {
		return res.status(500).json(new Response(err).fail());
	}

	return res.status(500).json(new Response({ message: "Unknown Error" }).fail());
}
