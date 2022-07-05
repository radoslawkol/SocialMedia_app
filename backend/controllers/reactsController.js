const React = require("../models/React");
const mongoose = require("mongoose");
exports.reactPost = async (req, res) => {
	try {
		const { postId, react } = req.body;

		const isReactExist = await React.findOne({
			postRef: postId,
			reactBy: mongoose.Types.ObjectId(req.user.id),
		});

		if (!isReactExist) {
			const newReact = await React.create({
				react,
				postRef: postId,
				reactBy: req.user.id,
			});
		} else {
			if (isReactExist.react === react) {
				await React.findByIdAndRemove(isReactExist._id);
			} else {
				await React.findByIdAndUpdate(isReactExist._id, { react });
			}
		}

		res.status(200).json({
			status: "success",
		});
	} catch (err) {
		res.status(500).json({
			status: "fail",
			message: err.message,
		});
	}
};
exports.getReacts = async (req, res) => {
	try {
		const { id } = req.params;

		const reacts = await React.find({ postRef: mongoose.Types.ObjectId(id) });
		const checkedReact = await React.findOne({
			postRef: req.params.id,
			reactBy: req.user.id,
		});

		res.status(200).json({
			reacts,
			check: checkedReact?.react,
		});
	} catch (err) {
		res.status(500).json({
			status: "fail",
			message: err.message,
		});
	}
};
