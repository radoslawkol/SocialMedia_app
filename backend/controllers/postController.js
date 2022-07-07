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

exports.getAllPosts = async (req, res) => {
	try {
		const posts = await Post.find()
			.populate("user", "firstName lastName picture username gender")
			.sort({ createdAt: -1 });

		res.status(200).json({
			status: "success",
			posts,
		});
	} catch (err) {
		res.status(500).json({
			status: "fail",
			message: err.message,
		});
	}
};
exports.comment = async (req, res) => {
	try {
		const { postId, comment, image, commentAt } = req.body;
		const newComment = await Post.findByIdAndUpdate(
			postId,
			{
				$push: {
					comments: {
						comment,
						images: image,
						commentedBy: req.user.id,
						commentAt,
					},
				},
			},
			{ new: true }
		).populate("comments.commentedBy", "picture firstName lastName username");

		res.status(201).json({
			status: "success",
			comments: newComment.comments,
		});
	} catch (err) {
		res.status(500).json({
			status: "fail",
			message: err.message,
		});
	}
};
