const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const postRouter = require("./routes/postRoutes");
const uploadRouter = require("./routes/uploadRoutes");
const reactRouter = require("./routes/reactRoutes");
const conversationRouter = require("./routes/conversationRoutes");
const messagesRouter = require("./routes/messagesRoutes");
const notificationsRouter = require("./routes/notificationsRoutes");
const cookieParser = require("cookie-parser");
const fileupload = require("express-fileupload");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
	fileupload({
		useTempFiles: true,
	})
);

const allowedOrgins = [
	"http://localhost:3000",
	"https://beconnected-app.netlify.app",
];

function corsOptions(req, res) {
	let origin = req.header("Origin");
	let options;
	if (allowedOrgins.indexOf(origin) > -1) {
		options = {
			origin: true,
			credentials: true,
			useSucessStatus: 200,
			methods: ["GET", "PUT", "POST", "PATCH", "DELETE", "OPTIONS"],
		};
	} else {
		options = {
			origin: false,
		};
	}
	res(null, options);
}

app.use(cors(corsOptions));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/images", uploadRouter);
app.use("/api/v1/reacts", reactRouter);
app.use("/api/v1/conversations", conversationRouter);
app.use("/api/v1/messages", messagesRouter);
app.use("/api/v1/notifications", notificationsRouter);

module.exports = app;
