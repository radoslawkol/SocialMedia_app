const express = require("express");
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
	{
		type: {
			type: String,
			enum: ["profilePicture", "coverPicture", null],
			default: null,
		},
		text: {
			type: String,
		},
		photos: {
			type: Array,
		},
		background: {
			type: String,
		},
		user: {
			type: mongoose.ObjectId,
			ref: "User",
			required: true,
		},
		comments: {
			comment: {
				type: String,
			},
			images: {
				type: Array,
			},
			commentedBy: {
				type: mongoose.ObjectId,
				ref: "User",
			},
			commentAt: {
				type: Date,
				default: new Date(),
			},
		},
	},
	{
		timestamps: true,
	}
);

const Model = mongoose.model("Post", postSchema);

module.exports = Model;
