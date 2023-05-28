const dotenv = require("dotenv").config();
const io = require("socket.io")(8900, {
	cors: {
		origin: [`https://beconnected-app.netlify.app:*`, "http://localhost:*"],
	},
});

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
		console.log(`${user} / 36`);
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
