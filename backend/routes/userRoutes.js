const express = require("express");
const { getUser } = require("../controllers/userController");
const {
	register,
	login,
	activateAccount,
	sendVerification,
} = require("../controllers/authController");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/activate", auth, activateAccount);
router.post("/sendVerification", auth, sendVerification);
// router.get("/:id", auth, getUser);

module.exports = router;
