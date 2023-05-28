const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

const DB_URL = process.env.DATABASE_URL.replace(
	"<password>",
	process.env.DATABASE_PASSWORD
);

try {
	mongoose.connect(DB_URL, (err, db) => {
		if (err) {
			console.log(err);
		}
		console.log("Database connected successfully");
	});
} catch (error) {
	console.log(error);
}

const PORT = process.env.PORT || 9000;

const server = app.listen(PORT, () => {
	console.log(`Server listenting on port: ${PORT}`);
});

const io = require("socket.io")(server, {
	cors: {
		origin: `${process.env.PRODUCTION_URL}`,
		methods: ["GET", "POST"],
	},
});

console.log(process.env.PRODUCTION_URL);

app.get("/", (req, res) => {
	res.send("Server is up and running");
});

// SOCKET.IO

let users = [];

const addUser = (userId, socketId) => {
	!users.some((user) => user.userId === userId) &&
		users.push({ userId, socketId });

	console.log(users);
};

const removeUser = (socketId) => {
	users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
	console.log(userId);
	return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
	console.log("a user connected");
	socket.on("addUser", (userId) => {
		console.log(userId);
		addUser(userId, socket.id);
		io.emit("getUsers", users);
	});

	socket.on("sendMessage", ({ senderId, receiverId, text }) => {
		const user = getUser(receiverId);
		if (user) {
			io.to(user.socketId).emit("getMessage", {
				senderId,
				text,
			});
		}
	});

	socket.on("disconnect", () => {
		console.log("a user disconnected");
		removeUser(socket.id);
		io.emit("getUsers", users);
	});
});
