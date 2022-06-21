const express = require("express");
const dotenv = require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 9000;

const DB_URL = process.env.DATABASE_URL.replace(
	"<password>",
	process.env.DATABASE_PASSWORD
);

try {
	mongoose.connect(DB_URL, { useNewUrlParser: true }, () => {
		console.log("Database connected successfully");
	});
} catch (error) {
	console.log(error);
}

app.listen(PORT, () => {
	console.log(`Server listenting on port: ${PORT}`);
});
