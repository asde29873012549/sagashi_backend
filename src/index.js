import path from "path";
import * as url from "url";
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import listingRoutes from "./routes/listingRouter.js";

import errorHandler from "./middleware/errorhandler.js";

dotenv.config();

const dirname = url.fileURLToPath(new URL(".", import.meta.url));
const app = express();
const port = process.env.PORT;
const frontEndIP = process.env.FRONT_END_IP;

const cors_option = {
	origin: frontEndIP,
	allowedHeaders: "Content-Type,Authorization",
	credentials: true,
	maxAge: 600,
};

app.use(cors(cors_option));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/listing", listingRoutes);
app.use(helmet());
app.use(errorHandler);

app.get("*", (req, res) => {
	res.status(404).sendFile(path.join(dirname, "view", "404.html"));
});

app.listen(port, () => {
	console.log("app start listening...");
});
