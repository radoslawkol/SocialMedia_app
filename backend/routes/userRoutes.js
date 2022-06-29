const express = require("express");
const {
	getUser,
	findUser,
	sendResetPasswordCode,
	validateResetCode,
	changePassword,
} = require("../controllers/userController");
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
router.post("/findUser", findUser);
router.post("/sendResetPasswordCode", sendResetPasswordCode);
router.post("/validateResetCode", validateResetCode);
router.post("/changePassword", changePassword);
// router.get("/:id", auth, getUser);

module.exports = router;
