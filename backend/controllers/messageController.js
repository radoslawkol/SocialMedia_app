const Message = require("../models/Message");

exports.createMessage = async (req, res) => {
	console.log(req.body);
	try {
		const newMessage = await Message.create({
			conversationId: req.body.conversationId,
			sender: req.body.sender,
			text: req.body.text,
		});

		const populatedMessage = await newMessage.populate(
			"sender",
			"firstName lastName picture username"
		);

		res.status(200).json({
			status: "success",
			message: populatedMessage,
		});
	} catch (err) {
		res.status(500).json({
			status: "success",
			message: err.message,
		});
	}
};
exports.getMessages = async (req, res) => {
	try {
		const messages = await Message.find({
			conversationId: req.params.conversationId,
		}).populate("sender", "firstName lastName picture username");

		messages.sort((a, b) => new Date(b) - new Date(a));
		res.status(200).json({
			status: "success",
			messages,
		});
	} catch (err) {
		res.status(500).json({
			status: "success",
			message: err.message,
		});
	}
};
