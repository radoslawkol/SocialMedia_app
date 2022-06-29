const User = require("../models/User");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
	try {
		let token = req.header("Authorization").split(" ")[1];

		if (!token) {
			return res.status(400).json({
				status: "fail",
				message: "Invalid Authentication!",
			});
		}

		const id = jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
			if (err) {
				return res.status(400).json({
					status: "fail",
					message: "Invalid Authentication!",
				});
			}
			return decoded.id;
		});

		const user = await User.findById(id);

		if (!user) {
			return res.status(400).json({
				status: "fail",
				message: "Not authenticated!",
			});
		}

		req.user = user;
		next();
	} catch (err) {
		res.status(500).json({
			status: "fail",
			message: err.message,
		});
	}
};
