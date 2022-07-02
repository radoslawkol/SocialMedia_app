const User = require("../models/User");
const Post = require("../models/Post");
const Code = require("../models/Code");
const generateCode = require("../helpers/generateCode");
const { sendResetCode } = require("../helpers/mailer.js");
const bcrypt = require("bcrypt");

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
		const user = await User.findOne({ username }).select("-password");

		if (!user) {
			return res.status(404).json({
				status: "fail",
				message: "User does not exist.",
			});
		}
		const posts = await Post.find({ user: user._id })
			.populate("user")
			.sort({ createdAt: -1 });

		res.status(200).json({
			status: "success",
			user,
			posts,
		});
	} catch (err) {
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
