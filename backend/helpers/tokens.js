const jwt = require("jsonwebtoken");

exports.generateToken = (payload, expired) => {
	return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: expired });
};
