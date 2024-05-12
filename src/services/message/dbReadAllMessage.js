import * as dotenv from "dotenv";
import { BaseError as SequelizeGenericError, Op } from "sequelize";
import sequelize, { Model } from "../../../sequelize/index.js";
import { formatDateTime } from "../../utils/date.js";
import { DatabaseError, UnknownError, ForbiddenError } from "../../utils/api_error.js";

dotenv.config();

export default async function dbReadMessage(req, res) {
    const messages = Model.Messages;

    const { time, chatroom_id } = req.body;

    const jwtUsername = res.locals.user;

    if (!jwtUsername) throw new ForbiddenError();

    try {
        const result = await sequelize.transaction(async (t) => {
            const message = await messages.update(
                {
                    read_at: formatDateTime(),
                },
                {
                    where: {
                        created_at: {
                            [Op.lt]: time,
                        },
                        chatroom_id,
						read_at: null,
						sender_name: {
							[Op.ne]: jwtUsername
						}
                    },
                },
                { transaction: t },
            );

            return message;
        });

        return result;
    } catch (err) {
        if (err instanceof ForbiddenError) {
            throw err;
        } else if (err instanceof SequelizeGenericError) {
            throw new DatabaseError(err.name);
        }
        throw new UnknownError();
    }
}