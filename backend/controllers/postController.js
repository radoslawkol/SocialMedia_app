const Post = require("../models/Post");
const User = require("../models/User");

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
		const userFollowing = await User.findById(req.user.id).select("following");
		const { following } = userFollowing;

		const promises = following.map((followPerson) => {
			return Post.find({ user: followPerson })
				.populate("user", "firstName lastName picture username gender")
				.populate(
					"comments.commentedBy",
					"picture  firstName lastName username"
				)
				.sort({ createdAt: -1 })
				.limit(10);
		});

		const followingPosts = await Promise.all(promises);

		const userPosts = await Post.find({ user: req.user.id })
			.populate("user", "firstName lastName picture username gender")
			.populate("comments.commentedBy", "picture  firstName lastName username")
			.sort({ createdAt: -1 })
			.limit(10);

		const posts = [...followingPosts.flat(), ...userPosts].sort(
			(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
		);

		res.status(200).json({
			status: "success",
			posts,
		});
	} catch (err) {
		console.log(err);
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
