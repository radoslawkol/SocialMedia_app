const express = require("express");
const mongoose = require("mongoose");

const reactSchema = new mongoose.Schema({
	react: {
		type: String,
		enum: ["like", "love", "wow", "angry", "sad", "happy"],
		required: true,
	},
	postRef: {
		type: mongoose.ObjectId,
		ref: "Post",
		required: true,
	},
	reactBy: {
		type: mongoose.ObjectId,
		ref: "User",
		required: true,
	},
});

const React = mongoose.model("React", reactSchema);

module.exports = React;
