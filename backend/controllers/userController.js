const User = require("../models/User");
const Code = require("../models/Code");
const generateCode = require("../helpers/generateCode");
const { sendResetCode } = require("../helpers/mailer.js");
const bcrypt = require("bcrypt");

exports.getUser = async (req, res) => {
	try {
		const id = req.params.id;
		const user = await User.findById(id).select("-password");

		res.status(200).json({
			status: "success",
			user,
		});
	} catch (err) {
		res.status(500).json({
			status: "fail",
			message: err.message,
		});
	}
};

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
