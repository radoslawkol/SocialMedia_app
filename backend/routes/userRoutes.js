const express = require("express");
const {
	getUser,
	findUser,
	sendResetPasswordCode,
	validateResetCode,
	changePassword,
	getProfile,
	updateProfilePicture,
	updateDetails,
	updateCover,
	addFriend,
	cancelRequest,
	follow,
	unfollow,
	acceptRequest,
	unfriend,
	deleteRequest,
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
router.get("/getProfile/:username", auth, getProfile);
router.patch("/updateProfilePicture", auth, updateProfilePicture);
router.patch("/updateDetails", auth, updateDetails);
router.patch("/updateCover", auth, updateCover);
router.patch("/addFriend/:id", auth, addFriend);
router.patch("/cancelRequest/:id", auth, cancelRequest);
router.patch("/follow/:id", auth, follow);
router.patch("/unfollow/:id", auth, unfollow);
router.patch("/acceptRequest/:id", auth, acceptRequest);
router.patch("/unfriend/:id", auth, unfriend);
router.patch("/deleteRequest/:id", auth, deleteRequest);

module.exports = router;
