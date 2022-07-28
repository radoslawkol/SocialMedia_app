const express = require("express");
const {
	getNotifications,
	createNotification,
	updateNotification,
} = require("../controllers/notificationsController");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/", auth, getNotifications);
router.post("/", auth, createNotification);
router.patch("/:id", auth, updateNotification);

module.exports = router;
