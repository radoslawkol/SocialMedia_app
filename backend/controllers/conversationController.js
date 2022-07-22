const Conversation = require("../models/Conversation");
const mongoose = require("mongoose");

exports.createConversation = async (req, res) => {
	try {
		const newConversation = await Conversation.create({
			members: [req.body.senderId, req.body.receiverId],
		});

		res.status(201).json({
			status: "success",
			conversation: newConversation,
		});
	} catch (err) {
		res.status(500).json({
			status: "fail",
			message: err.message,
		});
	}
};

exports.getConversations = async (req, res) => {
	try {
		const conversations = await Conversation.find({
			members: { $in: [req.params.userId] },
		}).populate("members", "firstName lastName picture username");

		res.status(200).json({
			status: "success",
			conversations,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			status: "fail",
			message: err.message,
		});
	}
};
