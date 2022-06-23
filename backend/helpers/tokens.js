const jwt = require("jsonwebtoken");

exports.generateToken = (payload, expired) => {
	jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: expired });
};
