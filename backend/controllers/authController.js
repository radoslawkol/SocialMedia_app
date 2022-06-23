const User = require("../models/User");
const { generateToken } = require("../helpers/tokens");
const {
	validateEmail,
	validateLength,
	validateUsername,
} = require("../helpers/validation");

exports.register = async (req, res) => {
	try {
		const {
			firstName,
			lastName,
			email,
			username,
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

		// const check = await User.findOne({ email });

		// if (check) {
		// 	return res.status(400).json({
		// 		status: "fail",
		// 		message: "Email already exists.",
		// 	});
		// }

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

		const newUsername = await validateUsername(username);

		const user = await User.create({
			firstName,
			lastName,
			email,
			username,
			password,
			confirmPassword,
			gender,
			bYear,
			bMonth,
			bDay,
		});

		const token = generateToken({ id: user._id.toString() }, "30m");
		res.status(201).json({
			status: "success",
			user,
		});
	} catch (err) {
		console.log(err);
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

		if (!email) {
			return res.status(400).json({
				status: "fail",
				message: "Invalid credentials",
			});
		}

		if (user.password !== password) {
			return res.status(400).json({
				status: "fail",
				message: "Invalid credentials",
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
