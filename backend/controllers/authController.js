const User = require("../models/User");
const { generateToken } = require("../helpers/tokens");
const { sendVerificationEmail } = require("../helpers/mailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const {
	validateUsername,
	validateEmail,
	validateLength,
} = require("../helpers/validationFunc");

exports.register = async (req, res) => {
	try {
		const {
			firstName,
			lastName,
			email,
			password,
			confirmPassword,
			gender,
			bYear,
			bMonth,
			bDay,
		} = req.body;

		if (!validateEmail(email)) {
			return res.status(400).json({
				status: "fail",
				message: "Invalid email address.",
			});
		}

		const isEmailExist = await User.findOne({ email });

		if (isEmailExist) {
			return res.status(400).json({
				status: "fail",
				message: "Email already exists. Try with a different one.",
			});
		}

		if (!validateLength(firstName, 2, 20)) {
			return res.status(400).json({
				status: "fail",
				message: "Name must contain between 2 and 20 characters.",
			});
		}
		if (!validateLength(lastName, 2, 30)) {
			return res.status(400).json({
				status: "fail",
				message: "Surname must contain between 2 and 30 characters.",
			});
		}
		if (!validateLength(password, 6, 20)) {
			return res.status(400).json({
				status: "fail",
				message: "Password must contain between 6 and 20 characters.",
			});
		}
		const username = firstName + lastName;
		const newUsername = await validateUsername(username);

		const user = await User.create({
			firstName,
			lastName,
			email,
			username: newUsername,
			password,
			confirmPassword,
			gender,
			bYear,
			bMonth,
			bDay,
		});

		const token = generateToken({ id: user._id.toString() }, "7d");

		const url = `${process.env.BASE_URL}/activate/${token}`;
		sendVerificationEmail(email, firstName, url);

		res.status(201).json({
			status: "success",
			message: "Register success! Please activate your email to start.",
			user: {
				id: user._id,
				username: user.username,
				picture: user.picture,
				firstName: user.firstName,
				lastName: user.lastName,
				token,
				verified: user.verified,
			},
		});
	} catch (err) {
		res.status(500).json({
			status: "fail",
			message: err.message,
		});
	}
};

exports.activateAccount = async (req, res) => {
	try {
		const { token } = req.body;
		const user = jwt.verify(token, process.env.JWT_SECRET_KEY);

		const isUserAlreadyActivated = await User.findById(user.id);

		if (isUserAlreadyActivated.verified) {
			return res
				.status(400)
				.json({ message: "This account is already activated." });
		} else {
			await User.findByIdAndUpdate(user.id, { verified: true });
			return res.status(200).json({
				status: "success",
				message: "Account has been activated successfully.",
			});
		}
	} catch (err) {
		res.status(500).json({
			status: "fail",
			message: err.message,
		});
	}
};

exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({
				status: "fail",
				message: "Invalid credentials",
			});
		}
		const isPasswordCorrect = await bcrypt.compare(password, user.password);
		if (!isPasswordCorrect) {
			return res.status(400).json({
				status: "fail",
				message: "Invalid credentials. Please try again!",
			});
		}
		const token = generateToken({ id: user._id.toString() }, "7d");

		res.status(200).json({
			status: "success",
			message: "You are logged in successfully.",
			user: {
				id: user._id,
				username: user.username,
				picture: user.picture,
				firstName: user.firstName,
				lastName: user.lastName,
				token,
				verified: user.verified,
			},
		});
	} catch (err) {
		res.status(500).json({
			status: "fail",
			message: err.message,
		});
	}
};
