const Post = require("../models/Post");

exports.createPost = async (req, res) => {
	try {
		const { type, text, photos, background, user, comments } = req.body;

		const newPost = await Post.create({
			type,
			text,
			photos,
			background,
			user,
			comments,
		});
		res.status(201).json({
			status: "success",
			post: newPost,
		});
	} catch (err) {
		res.status(500).json({
			status: "fail",
			message: err.message,
		});
	}
};
