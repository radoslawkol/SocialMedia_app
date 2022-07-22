const express = require("express");
const {
	createMessage,
	getMessages,
} = require("../controllers/messageController");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/", auth, createMessage);
router.get("/:conversationId", auth, getMessages);

module.exports = router;
