const Notification = require("../models/Notification");
const User = require("../models/User");
const Post = require("../models/Post");

exports.getNotifications = async (req, res) => {
	try {
		let promises;
		let myNotifications;
		let notifications;
		if (req.body.receiver === "") {
			const userFollowing = await User.findById(req.user.id).select(
				"following"
			);
			const { following } = userFollowing;

			promises = following.map((followPerson) => {
				return Notification.find({ sender: followPerson }).populate(
					"sender",
					"firstName lastName picture username gender"
				);
			});
			const followingNotifications = await Promise.all(promises);
			notifications = followingNotifications.flat();
		} else {
			myNotifications = await Notification.find({
				receiver: req.user.id,
			}).populate("sender", "firstName lastName picture username gender");
		}

		notifications = myNotifications.sort(
			(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
		);

		const notificationsNum = notifications.filter((n) => n.isRead === false);

		res.status(200).json({
			status: "success",
			notifications,
			unReadNotificationsNum: notificationsNum.length,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			staus: "fail",
			message: err.message,
		});
	}
};

exports.createNotification = async (req, res) => {
	try {
		const { type, sender, receiver } = req.body;

		if (type === "commentedPost" && receiver === req.user.id) {
			return res.status(400).json({
				status: "fail",
			});
		}

		const newNotification = await Notification.create({
			type,
			sender,
			receiver,
		});

		await newNotification.populate(
			"sender",
			"firstName lastName username picture"
		);

		res.status(200).json({
			status: "success",
			notification: newNotification,
		});
	} catch (err) {
		res.status(500).json({
			staus: "fail",
			message: err.message,
		});
	}
};

exports.updateNotification = async (req, res) => {
	try {
		const updatedNotification = await Notification.findByIdAndUpdate(
			req.params.id,
			{ isRead: true },
			{ new: true }
		);

		res.status(200).json({
			status: "success",
			notification: updatedNotification,
		});
	} catch (err) {
		res.status(500).json({
			staus: "fail",
			message: err.message,
		});
	}
};
