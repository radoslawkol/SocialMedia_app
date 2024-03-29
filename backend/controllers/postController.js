const Post = require("../models/Post");
const User = require("../models/User");
const mongoose = require("mongoose");

exports.createPost = async (req, res) => {
	try {
		const { type, text, photos, background, user, comments, sharedFrom } =
			req.body;

		if (sharedFrom?._id === req.user.id) {
			return res.status(400).json({
				status: "fail",
				message: "You cannot share your own post",
			});
		}

		const newPost = await Post.create({
			type,
			text,
			photos,
			background,
			user,
			sharedFrom,
			comments,
		});

		let populatedPost = await newPost.populate(
			"user",
			"picture username firstName lastName"
		);

		populatedPost = await populatedPost.populate(
			"sharedFrom",
			"firstName lastName username picture"
		);

		res.status(201).json({
			status: "success",
			post: populatedPost,
		});
	} catch (err) {
		console.log(err);
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
				.populate("sharedFrom", "firstName lastName username picture")
				.sort({ createdAt: -1 })
				.limit(10);
		});

		const followingPosts = await Promise.all(promises);

		const userPosts = await Post.find({ user: req.user.id })
			.populate("user", "firstName lastName picture username gender")
			.populate("comments.commentedBy", "picture  firstName lastName username")
			.populate("sharedFrom", "firstName lastName username picture")
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
exports.savePost = async (req, res) => {
	try {
		const { postId } = req.body;

		const user = await User.findById(req.user.id);
		const isAlreadySaved = user.savedPosts.find((post) => {
			if (post.post.toString() == postId) {
				return true;
			}
		});

		if (isAlreadySaved) {
			await User.findByIdAndUpdate(req.user.id, {
				$pull: {
					savedPosts: {
						post: postId,
					},
				},
			});

			res.status(200).json({
				status: "success",
				message: "Successfully unsaved.",
			});
		} else {
			const savedPost = await User.findByIdAndUpdate(
				req.user.id,
				{
					$push: {
						savedPosts: {
							post: postId,
							savedAt: new Date(),
						},
					},
				},
				{ new: true }
			);

			res.status(200).json({
				status: "success",
				post: savedPost,
			});
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({
			status: "fail",
			message: err.message,
		});
	}
};
exports.deletePost = async (req, res) => {
	try {
		await Post.findByIdAndRemove(req.params.id);

		res.status(200).json({
			status: "success",
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			status: "fail",
			message: err.message,
		});
	}
};
