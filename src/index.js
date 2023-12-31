import path from "path";
import * as url from "url";
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import listingRoutes from "./routes/listingRouter.js";
import userRoutes from "./routes/userRouter.js";
import messageRoutes from "./routes/messageRouter.js";
import notificationRoutes from "./routes/notificationRouter.js";
import designerRoutes from "./routes/designerRouter.js";
import treeRoutes from "./routes/treeRouter.js";
import categoryRoutes from "./routes/categoryRouter.js";
import searchRoutes from "./routes/searchRouter.js";

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
app.use("/user", userRoutes);
app.use("/message", messageRoutes);
app.use("/notification", notificationRoutes);
app.use("/designer", designerRoutes);
app.use("/tree", treeRoutes);
app.use("/category", categoryRoutes);
app.use("/search", searchRoutes);
app.use(helmet());
app.use(errorHandler);

app.get("*", (req, res) => {
	res.status(404).sendFile(path.join(dirname, "view", "404.html"));
});

app.listen(port, () => {
	console.log("app start listening...");
});
