const express = require("express");
const mongoose = require("mongoose");

const codeSchema = new mongoose.Schema({
	code: {
		type: String,
		required: true,
	},
	user: {
		type: mongoose.ObjectId,
		ref: "User",
		required: true,
	},
});

const Code = mongoose.model("Code", codeSchema);

module.exports = Code;
