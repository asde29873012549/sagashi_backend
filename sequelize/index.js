import sequelize from "../config/db.js";
// import associations from "./associations.js";

import categories from "./models/categories.model.js";
import chatrooms from "./models/chatrooms.model.js";
import designers from "./models/designers.model.js";
import discounts from "./models/discounts.model.js";
import featuredDesigners from "./models/featuredDesigners.model.js";
import follows from "./models/follows.model.js";
import likes from "./models/likes.model.js";
import messages from "./models/messages.model.js";
import notifications from "./models/notifications.model.js";
import offers from "./models/offers.model.js";
import products from "./models/products.model.js";
import recentlyViewed from "./models/recentlyViewed.model.js";
import shoppingCart from "./models/shoppingCart.model.js";
import sizes from "./models/sizes.model.js";
import userAddress from "./models/userAddress.model.js";
import users from "./models/users.model.js";
import products_to_be_sync from "./models/products_to_be_sync.model.js";

// const pg_channel = process.env.PG_NOTIFY_CHANNEL

const modelDefiners = [
	categories,
	chatrooms,
	designers,
	discounts,
	featuredDesigners,
	follows,
	likes,
	messages,
	notifications,
	offers,
	products,
	recentlyViewed,
	shoppingCart,
	sizes,
	userAddress,
	users,
	products_to_be_sync,
];

modelDefiners.forEach((model) => {
	model(sequelize);
});

/*
associations(sequelize);


async function syncDB() {
	await sequelize.sync({
		schema:"sagashi"
	});
}

await syncDB();


// Create notify function
await sequelize.query(`
CREATE OR REPLACE FUNCTION sagashi.notify_trigger() RETURNS trigger AS $trigger$
DECLARE
  rec RECORD;
  payload TEXT;
  column_name TEXT;
  column_value TEXT;
  payload_items json;
BEGIN
  -- Set record row depending on operation
  CASE TG_OP
  WHEN 'INSERT','UPDATE' THEN
     rec := NEW;
  WHEN 'DELETE' THEN
     rec := OLD;
  ELSE
     RAISE EXCEPTION 'Unknown TG_OP: "%". Should not occur!', TG_OP;
  END CASE;

  -- Get required fields
  payload_items := row_to_json(rec);

  -- Build the payload
  payload := json_build_object('timestamp',CURRENT_TIMESTAMP,'operation',TG_OP,'schema',TG_TABLE_SCHEMA,'table',TG_TABLE_NAME,'data',payload_items);

  -- Notify the channel
  PERFORM pg_notify('${pg_channel}', payload);
  
  RETURN rec;
END;
$trigger$ LANGUAGE plpgsql;
`)

// Create trigger
await sequelize.query(`
CREATE OR REPLACE TRIGGER products_notify
    AFTER INSERT OR DELETE OR UPDATE
    ON sagashi."Products_to_be_sync"
    FOR EACH ROW
    EXECUTE FUNCTION sagashi.notify_trigger();
`)
*/

const Model = sequelize.models;

export default sequelize;
export { Model };
