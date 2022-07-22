const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
	{
		conversationId: {
			type: mongoose.ObjectId,
			ref: "Conversation",
			required: [true, "ConversationId is required"],
		},
		sender: {
			type: mongoose.ObjectId,
			ref: "User",
			required: [true, "Sender is required"],
		},
		text: {
			type: String,
			required: [true, "Message is required."],
		},
	},
	{ timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
