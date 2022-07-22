const mongoose = require("mongoose");

const conversationSchemwa = new mongoose.Schema(
	{
		members: [{ type: mongoose.ObjectId, ref: "User" }],
	},
	{ timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchemwa);

module.exports = Conversation;
