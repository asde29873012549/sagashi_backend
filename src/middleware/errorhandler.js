import { AppError } from "../utils/api_error.js";

export default function error_handler(err, req, res, next) {
	if (err instanceof AppError) {
		return res.status(err.code).json({
			status: "error",
			message: err.messag,
		});
	}

	return res.status(500).json({
		status: "error",
		message: "Unknown Error",
	});
}
