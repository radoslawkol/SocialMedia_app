const dotenv = require("dotenv").config();
const io = require("socket.io")(8900, {
	cors: {
		origin: [`https://beconnected-app.netlify.app:*`, "http://localhost:*"],
		methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
	},
});

let users = [];

const addUser = (userId, socketId) => {
	!users.some((user) => user.userId === userId) &&
		users.push({ userId, socketId });
};

const removeUser = (socketId) => {
	users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
	return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
	socket.on("addUser", (userId) => {
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
		removeUser(socket.id);
		io.emit("getUsers", users);
	});
});
