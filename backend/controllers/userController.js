const User = require("../models/User");
const Post = require("../models/Post");
const Code = require("../models/Code");
const generateCode = require("../helpers/generateCode");
const { sendResetCode } = require("../helpers/mailer.js");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

exports.findUser = async (req, res) => {
	try {
		const { email } = req.body;
		const user = await User.findOne({ email }).select("-password");

		if (!user) {
			return res.status(400).json({
				status: "fail",
				message: "Account does not exist.",
			});
		}

		res.status(200).json({
			status: "success",
			email,
			picture: user.picture,
		});
	} catch (err) {
		res.status(500).json({
			status: "fail",
			message: err.message,
		});
	}
};

exports.sendResetPasswordCode = async (req, res) => {
	try {
		const { email } = req.body;
		const user = await User.findOne({ email }).select("-password");
		await Code.findOneAndRemove({ user: user._id });

		const code = generateCode(5);
		const savedCode = await Code.create({
			code,
			user: user._id,
		});

		sendResetCode(user.email, user.firstName, code);

		res.status(200).json({
			status: "success",
			message: "Email reset code has been sent to your email.",
		});
	} catch (err) {
		res.status(500).json({
			status: "fail",
			message: err.message,
		});
	}
};

exports.validateResetCode = async (req, res) => {
	try {
		const { email, code } = req.body;

		const user = await User.findOne({ email }).select("-password");

		const codeDb = await Code.findOne({ user: user._id });

		if (code !== codeDb.code) {
			return res.status(400).json({
				status: "fail",
				message: "Verification code is wrong.",
			});
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

exports.changePassword = async (req, res) => {
	try {
		const { email, password } = req.body;
		console.log(email);
		const cryptedPassword = await bcrypt.hash(password, 12);
		const user = await User.findOne({ email });
		console.log(user);
		const updated = await User.findOneAndUpdate(
			{ email: email },
			{ password: cryptedPassword }
		);

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

exports.getProfile = async (req, res) => {
	try {
		const { username } = req.params;
		const user = await User.findById(req.user.id);
		const profile = await User.findOne({ username }).select("-password");

		const friendship = {
			friends: false,
			following: false,
			requestSent: false,
			requestReceived: false,
		};

		if (!user) {
			return res.status(404).json({
				status: "fail",
				message: "User does not exist.",
			});
		}

		if (
			user.friends.includes(profile._id) &&
			profile.friends.includes(user._id)
		) {
			friendship.friends = true;
		}
		if (user.following.includes(profile._id)) {
			friendship.following = true;
		}

		if (user.requests.includes(profile._id)) {
			friendship.requestReceived = true;
		}
		if (profile.requests.includes(user._id)) {
			friendship.requestSent = true;
		}

		await profile.populate("friends", "firstName lastName username picture");

		const posts = await Post.find({ user: profile._id })
			.populate("user")
			.populate(
				"comments.commentedBy",
				"firstName lastName picture username commentAt"
			)
			.populate("sharedFrom", "firstName lastName picture username")
			.sort({ createdAt: -1 });

		res.status(200).json({
			status: "success",
			user: { ...profile.toObject(), friendship },
			posts: posts.slice(0, 30),
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			status: "fail",
			message: err.message,
		});
	}
};

exports.updateProfilePicture = async (req, res) => {
	try {
		const { url } = req.body;

		await User.findByIdAndUpdate(req.user.id, {
			picture: url,
		});

		res.status(200).json({
			status: "success",
			url,
		});
	} catch (err) {
		res.status(500).json({
			status: "fail",
			message: err.message,
		});
	}
};
exports.updateDetails = async (req, res) => {
	try {
		const { infos } = req.body;

		const updated = await User.findByIdAndUpdate(
			req.user.id,
			{ details: infos },
			{ new: true }
		);

		res.status(200).json({
			status: "success",
			details: updated.details,
		});
	} catch (err) {
		res.status(500).json({
			status: "fail",
			message: err.message,
		});
	}
};

exports.updateCover = async (req, res) => {
	try {
		const { url } = req.body;

		await User.findByIdAndUpdate(req.user.id, {
			cover: url,
		});

		res.status(200).json({
			status: "success",
			url,
		});
	} catch (err) {
		res.status(500).json({
			status: "fail",
			message: err.message,
		});
	}
};
exports.addFriend = async (req, res) => {
	try {
		if (req.user.id !== req.params.id) {
			const sender = await User.findById(req.user.id);
			const receiver = await User.findById(req.params.id);

			if (
				!receiver.friends.includes(sender._id) &&
				!receiver.requests.includes(sender._id)
			) {
				await receiver.updateOne({
					$push: {
						requests: sender._id,
					},
				});
				await receiver.updateOne({
					$push: {
						followers: sender._id,
					},
				});
				await sender.updateOne({
					$push: {
						following: receiver._id,
					},
				});
				res.status(200).json({
					status: "sucess",
					message: "Friend request has been sended!",
				});
			} else {
				return res.status(400).json({
					status: "fail",
					message: "Request has been already sent.",
				});
			}
		} else {
			return res.status(400).json({
				status: "fail",
				message: "You can not send a request to yourself",
			});
		}
	} catch (err) {
		res.status(500).json({
			status: "fail",
			message: err.message,
		});
	}
};

exports.cancelRequest = async (req, res) => {
	try {
		if (req.user.id !== req.params.id) {
			const sender = await User.findById(req.user.id);
			const receiver = await User.findById(req.params.id);

			if (
				receiver.requests.includes(sender._id) &&
				!receiver.friends.includes(sender._id)
			) {
				await receiver.updateOne({
					$pull: {
						requests: sender._id,
					},
				});
				await receiver.updateOne({
					$pull: {
						followers: sender._id,
					},
				});
				await sender.updateOne({
					$pull: {
						following: receiver._id,
					},
				});
				res.status(200).json({
					status: "sucess",
					message: "Successfully canceled.",
				});
			} else {
				return res.status(400).json({
					status: "fail",
					message: "Request has been already canceled.",
				});
			}
		} else {
			return res.status(400).json({
				status: "fail",
				message: "You can not cancel a request to yourself",
			});
		}
	} catch (err) {
		res.status(500).json({
			status: "fail",
			message: err.message,
		});
	}
};
exports.follow = async (req, res) => {
	try {
		if (req.user.id !== req.params.id) {
			const sender = await User.findById(req.user.id);
			const receiver = await User.findById(req.params.id);

			if (
				!receiver.followers.includes(sender._id) &&
				!sender.following.includes(receiver._id)
			) {
				await receiver.updateOne({
					$push: {
						followers: sender._id,
					},
				});

				await sender.updateOne({
					$push: {
						following: receiver._id,
					},
				});
				res.status(200).json({
					status: "sucess",
					message: "Successfully followed.",
				});
			} else {
				return res.status(400).json({
					status: "fail",
					message: "Already following.",
				});
			}
		} else {
			return res.status(400).json({
				status: "fail",
				message: "You can not follow yourself.",
			});
		}
	} catch (err) {
		res.status(500).json({
			status: "fail",
			message: err.message,
		});
	}
};

exports.unfollow = async (req, res) => {
	try {
		if (req.user.id !== req.params.id) {
			const sender = await User.findById(req.user.id);
			const receiver = await User.findById(req.params.id);

			if (
				receiver.followers.includes(sender._id) &&
				sender.following.includes(receiver._id)
			) {
				await receiver.updateOne({
					$pull: {
						followers: sender._id,
					},
				});

				await sender.updateOne({
					$pull: {
						following: receiver._id,
					},
				});
				res.status(200).json({
					status: "sucess",
					message: "Successfully unfollowed.",
				});
			} else {
				return res.status(400).json({
					status: "fail",
					message: "Already unfollowed.",
				});
			}
		} else {
			return res.status(400).json({
				status: "fail",
				message: "You can not unfollow yourself.",
			});
		}
	} catch (err) {
		res.status(500).json({
			status: "fail",
			message: err.message,
		});
	}
};

exports.acceptRequest = async (req, res) => {
	try {
		if (req.user.id !== req.params.id) {
			const receiver = await User.findById(req.user.id);
			const sender = await User.findById(req.params.id);

			if (
				receiver.requests.includes(sender._id) &&
				!sender.friends.includes(receiver._id)
			) {
				await receiver.updateOne({
					$push: {
						friends: sender._id,
					},
				});

				if (!receiver.following.includes(sender._id)) {
					await receiver.updateOne({
						$push: {
							following: sender._id,
						},
					});
				}
				if (!receiver.followers.includes(sender._id)) {
					await receiver.updateOne({
						$push: {
							followers: sender._id,
						},
					});
				}

				await sender.updateOne({
					$push: {
						friends: receiver._id,
					},
				});

				if (!sender.following.includes(receiver._id)) {
					await sender.updateOne({
						$push: {
							following: receiver._id,
						},
					});
				}

				if (!sender.followers.includes(receiver._id)) {
					await sender.updateOne({
						$push: {
							followers: receiver._id,
						},
					});
				}
				await receiver.updateOne({
					$pull: {
						requests: sender._id,
					},
				});
				res.status(200).json({
					status: "sucess",
					message: "Successfully unfollowed.",
				});
			} else {
				return res.status(400).json({
					status: "fail",
					message: "Already friends.",
				});
			}
		} else {
			return res.status(400).json({
				status: "fail",
				message: "You can not accept request from yourself.",
			});
		}
	} catch (err) {
		res.status(500).json({
			status: "fail",
			message: err.message,
		});
	}
};
exports.unfriend = async (req, res) => {
	try {
		if (req.user.id !== req.params.id) {
			const sender = await User.findById(req.user.id);
			const receiver = await User.findById(req.params.id);

			if (
				sender.friends.includes(receiver._id) &&
				receiver.friends.includes(sender._id)
			) {
				await receiver.updateOne({
					$pull: {
						friends: sender._id,
					},
				});
				await receiver.updateOne({
					$pull: {
						following: sender._id,
					},
				});
				await receiver.updateOne({
					$pull: {
						followers: sender._id,
					},
				});

				await sender.updateOne({
					$pull: {
						friends: receiver._id,
					},
				});
				await sender.updateOne({
					$pull: {
						followers: receiver._id,
					},
				});
				await sender.updateOne({
					$pull: {
						following: receiver._id,
					},
				});
				res.status(200).json({
					status: "sucess",
					message: "Successfully not friends.",
				});
			} else {
				return res.status(400).json({
					status: "fail",
					message: "Already not friends.",
				});
			}
		} else {
			return res.status(400).json({
				status: "fail",
				message: "You can not unfriend yourself.",
			});
		}
	} catch (err) {
		res.status(500).json({
			status: "fail",
			message: err.message,
		});
	}
};

exports.deleteRequest = async (req, res) => {
	try {
		if (req.user.id !== req.params.id) {
			const receiver = await User.findById(req.user.id);
			const sender = await User.findById(req.params.id);

			if (receiver.requests.includes(sender._id)) {
				await receiver.updateOne({
					$pull: {
						requests: sender._id,
					},
				});
				await receiver.updateOne({
					$pull: {
						followers: sender._id,
					},
				});
				await sender.updateOne({
					$pull: {
						following: sender._id,
					},
				});

				res.status(200).json({
					status: "sucess",
					message: " Request successfully deleted.",
				});
			} else {
				return res.status(400).json({
					status: "fail",
					message: "Request already deleted.",
				});
			}
		} else {
			return res.status(400).json({
				status: "fail",
				message: "You can not delete request from yourself.",
			});
		}
	} catch (err) {
		res.status(500).json({
			status: "fail",
			message: err.message,
		});
	}
};
exports.search = async (req, res) => {
	try {
		const searchTerm = req.params.searchTerm.replace(/\s/g, "");
		console.log(searchTerm);

		const results = await User.find({
			username: { $regex: searchTerm, $options: "i" },
		}).select("firstName lastName picture username");

		res.status(200).json({
			status: "success",
			results,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			status: "fail",
			message: err.message,
		});
	}
};
exports.addToSearchHistory = async (req, res) => {
	try {
		const { searchUser } = req.body;
		const user = await User.findById(req.user.id);

		const check = user.search.find((s) => s.user.toString() === searchUser);
		if (check) {
			await User.updateOne(
				{
					_id: req.user.id,
					"search._id": check._id,
				},
				{
					$set: { "search.$.createdAt": new Date() },
				}
			);
			res.status(200).json({
				status: "success",
			});
		} else {
			await User.findByIdAndUpdate(req.user.id, {
				$push: {
					search: {
						user: searchUser,
						createdAt: new Date(),
					},
				},
			});

			res.status(200).json({
				status: "success",
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
exports.getSearchHistory = async (req, res) => {
	try {
		const history = await User.findById(req.user.id)
			.select("search")
			.populate("search.user", "picture username lastName firstName");

		res.status(200).json({
			status: "success",
			results: history.search,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			status: "fail",
			message: err.message,
		});
	}
};
exports.deleteFromHistory = async (req, res) => {
	try {
		const { searchUser } = req.body;
		await User.updateOne(
			{ _id: req.user.id },
			{
				$pull: {
					search: {
						user: searchUser,
					},
				},
			}
		);

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
exports.getFriendsInfos = async (req, res) => {
	try {
		const isSlider = req.query.slider;

		const user = await User.findById(req.user.id)
			.select("friends requests")
			.populate(
				"friends",
				"firstName lastName picture username bDay bMonth bYear"
			)
			.populate("requests", "firstName lastName picture username");

		const sentRequests = await User.find({
			requests: mongoose.Types.ObjectId(req.user.id),
		}).select("firstName lastName picture username");

		const users = await User.find()
			.select(
				"_id friends requests sentRequests firstName lastName username picture"
			)
			.populate("friends", "_id")
			.populate("requests", "_id");

		let friendsProposal = users
			.filter((u) => {
				if (u._id.toString() === req.user.id) {
					return false;
				}
				return true;
			})
			.filter((u) => {
				let check = true;

				const returnFn = (value) => {
					return value;
				};

				for (let request of sentRequests) {
					if (request._id.toString() === u._id.toString()) {
						console.log(false);
						return false;
					} else {
						console.log(true);
						return true;
					}
				}

				// sentRequests?.forEach((request) => {
				// 	if (request._id.toString() === u._id.toString()) {
				// 		// check = false;
				// 		returnFn(false);
				// 	} else {
				// 		// check = true;
				// 		returnFn(true);
				// 	}
				// });

				// return check;
			});

		// 	.filter((u) => {
		// 		let check = true;
		// 		if (sentRequests) {
		// 			sentRequests?.map((request) => {
		// 				if (request._id.toString() === u._id.toString()) {
		// 					check = false;
		// 				} else {
		// 					check = true;
		// 				}
		// 			});
		// 		}
		// 		return check;
		// 	})
		// 	.filter((u) => {
		// 		let check = true;

		// 		if (user.requests) {
		// 			user.requests?.map((request) => {
		// 				if (request._id.toString() === u._id.toString()) {
		// 					check = false;
		// 				} else {
		// 					check = true;
		// 				}
		// 			});
		// 		}

		// 		return check;
		// 	})
		// 	.filter((u) => {
		// 		let check = true;

		// 		user.friends.map((friend) => {
		// 			console.log(friend._id.toString());
		// 			console.log(u._id.toString());
		// 			if (friend._id.toString() === u._id.toString()) {
		// 				console.log(friend._id);
		// 				console.log("To remove");
		// 				check = false;
		// 				console.log(check);
		// 			} else {
		// 				check = true;
		// 			}
		// 		});

		// 		return check;
		// 	});

		// console.log(user.friends);
		// const filterFunc = (u) => {
		// 	let condition;
		// 	user.friends.map((friend) => {
		// 		if (friend._id.toString() === u._id.toString()) {
		// 			condition = false;
		// 		} else {
		// 			condition = true;
		// 		}
		// 	});
		// };

		// let friendsProposal = users.filter((u) => filterFunc(u));

		// const test = await User.findById(req.user.id).select("friends");
		// console.log(test.friends);

		// let friendsProposal = users.filter((u) => {
		// 	console.log(test.friends);
		// 	const srtArr = test.friends.map((friend) => {
		// 		return friend.toString();
		// 	});
		// 	console.log(srtArr);
		// 	console.log(u._id);

		// 	const idStr = u._id.toString();
		// 	console.log(idStr);
		// 	return srtArr.some((str) => str != idStr);
		// });

		// let friendsProposal = users.filter((u) => {
		// 	user.friends.forEach((friend) => {
		// 		if (friend._id.toString() !== u._id.toString()) {
		// 		}
		// 	});
		// });

		friendsProposal = friendsProposal.slice(0, 20);

		if (isSlider === "true") {
			res.status(200).json({
				status: "success",
				friendsProposal,
			});
		} else {
			res.status(200).json({
				status: "success",
				data: {
					friends: user.friends,
					requests: user.requests,
					sentRequests: sentRequests,
					friendsProposal,
				},
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

exports.getSavedPosts = async (req, res) => {
	try {
		const saved = await User.findById(req.params.id)
			.select("savedPosts")
			.populate({
				path: "savedPosts.post",
				select: "background photos text type user",
				populate: {
					path: "user",
					select: "firstName lastName username picture",
				},
			});

		if (saved) {
			return res.status(200).json({
				status: "success",
				saved,
			});
		}
		res.status(400).json({
			status: "fail",
			message: 'You don"t have saved posts.',
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			status: "fail",
			message: err.message,
		});
	}
};
exports.unsavePost = async (req, res) => {
	try {
		console.log(req.body);
		await User.findByIdAndUpdate(req.params.id, {
			$pull: {
				savedPosts: {
					post: req.body.postId,
				},
			},
		});

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
