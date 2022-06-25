const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

const allowedOrgins = ["http://localhost:3000", "productionUrl"];

function corsOptions(req, res) {
	let origin = req.header("Origin");
	let options;
	if (allowedOrgins.indexOf(origin) > -1) {
		options = {
			origin: true,
			useSucessStatus: 200,
		};
	} else {
		options = {
			origin: false,
		};
	}
	res(null, options);
}

app.use(cors(corsOptions));

app.get("/", (req, res) => {
	res.send("hello");
});

app.use("/api/v1/users", userRouter);

module.exports = app;
