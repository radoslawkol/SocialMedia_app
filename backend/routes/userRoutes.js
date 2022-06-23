const express = require("express");
const {getUser} = require("../controllers/userController");
const { register, login } = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/:id", getUser);

module.exports = router;
