const User = require("../models/User");

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
