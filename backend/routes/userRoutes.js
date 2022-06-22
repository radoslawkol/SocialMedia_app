const express = require("express");
// const {} = require("../controllers/userController");
const { register } = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);

module.exports = router;
