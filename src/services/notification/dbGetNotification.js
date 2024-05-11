import * as dotenv from "dotenv";
import { BaseError as SequelizeGenericError, Op } from "sequelize";
import sequelize, { Model } from "../../../sequelize/index.js";
import { DatabaseError, UnknownError } from "../../utils/api_error.js";

dotenv.config();

const concatenateSenderName = (senderArray) => {
	let result = "";
	if (senderArray.length <= 2) {
		result = senderArray.join(", ");
	} else if (senderArray.length === 3) {
		result = `${senderArray.slice(0, -1).join(", ")} and ${senderArray.slice(-1)}`;
	} else {
		result = `${senderArray[0]}, ${senderArray[1]}, and ${senderArray.length - 2} others`;
	}

	return result;
}

export default async function dbGetNotification(req, res) {
	const notification = Model.Notifications;
	const notificationReceiverMap = Model.NotificationReceiverMap;

	const { cursor } = req.params;

	const jwtUsername = res.locals.user;

	const sqlObj = {
		where: {
			username: jwtUsername,
		},
		include: {
			model: notification,
			required: true,
		},
		order: [["created_at", "desc"]],
		limit: 10,
	};

	if (cursor) sqlObj.where.id = { [Op.gt]: cursor };

	try {
		const result = await sequelize.transaction(async (t) => {
			const notifications = await notificationReceiverMap.findAll(sqlObj, { transaction: t });

			return notifications;
		});

		if (!result) throw new DatabaseError();

		const formattedResult = result.map((noti) => noti.Notification);
		const finalResult = formattedResult.reduce((acc, cur) => {
			const curr = cur.dataValues;
			// Find an existing group by 'listing_name'
			const group = acc.find((n) => n.content.listing_name === curr.content.listing_name && n.type === curr.type);

			if (group) {
				// If the group exists, concatenate sender_name from current notification
				group.sender_name = [...new Set([...group.sender_name, curr.sender_name])];
				group.id = !curr.read_at ? [...group.id, curr.id] : group.id;
				group.read_at = !curr.read_at ? null : group.read_at; 
			} else {
				// If no group exists, push the current notification into the acc
				acc.push({ ...curr, sender_name: [curr.sender_name], id: [curr.id]});
			}
			return acc;
		}, []).map((obj) => ({ ...obj, sender_name: concatenateSenderName(obj.sender_name)}));

		return finalResult;
	} catch (err) {
		console.log(err);
		if (err instanceof SequelizeGenericError) {
			throw new DatabaseError(err.name);
		}
		throw new UnknownError();
	}
}
