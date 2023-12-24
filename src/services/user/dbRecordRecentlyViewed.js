import publish_log from "../../../rabbitmq/log_service/publisher.js";
import { UnknownError } from "../../utils/api_error.js";

export default function dbRecordRecentlyViewed(req, res) {
	const { product_id } = req.body;
	const jwtUsername = res.locals.user;

	try {
		const sendLog = async () => {
			await publish_log({
				type: "log.recentlyViewed",
				username: jwtUsername,
				product_id,
			});
		};

		sendLog();

		return { success: true };

	} catch (err) {
		console.log(err);
		throw new UnknownError("failed to send log to recentlyViewed queue");
	}
}