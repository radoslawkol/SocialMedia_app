const mongoose = require("mongoose");
// const { validateEmail } = require("../helpers/validationFunc"); // cause error with mongoose findOne is not a function  Don't import file to model file, which import model
const validateEmail = (email) => {
	return String(email)
		.toLowerCase()
		.match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/);
};

const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: [true, "User has to have a name"],
		},
		lastName: {
			type: String,
			required: [true, "User has to have a surname."],
		},
		username: {
			type: String,
			unique: true,
			trim: true,
		},
		email: {
			type: String,
			trim: true,
			lowercase: true,
			unique: true,
			required: [true, "User must pass an email"],
			validate: [validateEmail, "Please fill a valid email address."],
		},
		password: {
			type: String,
			required: [true, "You must pass a password."],
		},
		confirmPassword: {
			type: String,
			required: [true, "You must confirm a password."],
			validate: {
				validator: function (el) {
					return el === this.password;
				},
			},
		},
		cover: {
			type: String,
			trim: true,
		},
		picture: {
			type: String,
			trim: true,
			default:
				"https://res.cloudinary.com/detfhw9ll/image/upload/v1656754232/SocialMediaApp/download_dzo3jm.jpg",
		},
		gender: {
			type: String,
			enum: ["male", "female", "custom"],
			required: [true, "You must specify your gender."],
		},
		bYear: {
			type: Number,
			trim: true,
			required: [true, 'You must fill your birthday"s year.'],
		},
		bMonth: {
			type: Number,
			trim: true,
			required: [true, 'You must fill your birthday"s month.'],
		},
		bDay: {
			type: Number,
			trim: true,
			required: [true, 'You must fill your birthday"s day.'],
		},
		verified: {
			type: Boolean,
			default: false,
		},
		search: [
			{
				user: {
					type: mongoose.ObjectId,
					ref: "User",
				},
				createdAt: {
					type: Date,
					required: true,
				},
			},
		],
		friends: [
			{
				type: mongoose.ObjectId,
				ref: "User",
			},
		],
		requests: [
			{
				type: mongoose.ObjectId,
				ref: "User",
			},
		],
		following: [
			{
				type: mongoose.ObjectId,
				ref: "User",
			},
		],
		followers: [
			{
				type: mongoose.ObjectId,
				ref: "User",
			},
		],
		savedPosts: [
			{
				post: {
					type: mongoose.ObjectId,
					ref: "Post",
				},
				savedAt: {
					type: Date,
				},
			},
		],
		details: {
			bio: {
				type: String,
			},
			job: {
				type: String,
			},
			workplace: {
				type: String,
			},
			highSchool: {
				type: String,
			},
			college: {
				type: String,
			},
			currentCity: {
				type: String,
			},
			hometown: {
				type: String,
			},
			relationship: {
				type: String,
				enum: ["Single", "In a relationship", "Divorced"],
			},
			instagram: {
				type: String,
			},
		},
	},
	{
		timestamps: true,
	}
);

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();

	this.password = await bcrypt.hash(this.password, 12);

	this.confirmPassword = undefined;
});

module.exports = mongoose.model("User", userSchema);
