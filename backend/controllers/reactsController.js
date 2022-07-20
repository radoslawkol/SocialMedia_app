const React = require("../models/React");
const User = require("../models/User");
const mongoose = require("mongoose");
exports.reactPost = async (req, res) => {
	try {
		const { postId, react } = req.body;

		const isReactExist = await React.findOne({
			postRef: mongoose.Types.ObjectId(postId),
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

		const reacts = await React.find({
			postRef: mongoose.Types.ObjectId(id),
		});

		const groupedReacts = reacts.reduce((group, react) => {
			let key = react.react;
			group[key] = group[key] || [];
			group[key].push(react);
			return group;
		}, {});

		const finalArr = [
			{
				_id: "like",
				count: groupedReacts.like ? groupedReacts.like.length : 0,
			},
			{
				_id: "love",
				count: groupedReacts.love ? groupedReacts.love.length : 0,
			},
			{
				_id: "happy",
				count: groupedReacts.happy ? groupedReacts.happy.length : 0,
			},
			{
				_id: "wow",
				count: groupedReacts.wow ? groupedReacts.wow.length : 0,
			},
			{
				_id: "angry",
				count: groupedReacts.angry ? groupedReacts.angry.length : 0,
			},
			{
				_id: "sad",
				count: groupedReacts.sad ? groupedReacts.sad.length : 0,
			},
		].sort((a, b) => {
			return b.count - a.count;
		});

		const checkedReact = await React.findOne({
			postRef: req.params.id,
			reactBy: req.user.id,
		});

		const user = await User.findById(req.user.id);
		const checkSaved = user?.savedPosts.find((x) => x.post.toString() === id);

		res.status(200).json({
			reacts: finalArr,
			check: checkedReact?.react,
			total: reacts.length,
			checkSaved: checkSaved ? true : false,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			status: "fail",
			message: err.message,
		});
	}
};
