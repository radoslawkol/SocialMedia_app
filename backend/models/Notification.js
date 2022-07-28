const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
	{
		type: {
			type: String,
			enum: [
				"newPost",
				"newPicture",
				"sharedPost",
				"commentedPost",
				"friendRequest",
				"acceptRequest",
			],
			required: [true, "Type is required"],
		},
		sender: {
			type: mongoose.ObjectId,
			ref: "User",
			required: [true, "Sender is required"],
		},

		receiver: {
			type: String,
		},

		isRead: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
