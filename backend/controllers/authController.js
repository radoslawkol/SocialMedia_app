const User = require("../models/User");
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

		const findEmail = await User.findOne({ email });

		if (findEmail) {
			return res.status(400).json({
				status: "fail",
				message: "Email already exists.",
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
