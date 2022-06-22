const User = require("../models/User");

exports.validateEmail = (email) => {
	const regExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return regExp.test(email);
};

exports.validateLength = (text, min, max) => {
	if (text.length < min || text.length > max) {
		return false;
	}
	return true;
};

exports.validateUsername = async (username) => {
	let newUsername;
	const isUsernameExist = await User.findOne({ username });

	if (isUsernameExist) {
		newUsername += +new Date() * Math.random().toString().substring(0, 1);
	}
	return newUsername;
};
