const express = require("express");
const {
	createConversation,
	getConversations,
} = require("../controllers/conversationController");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/", auth, createConversation);
router.get("/:userId", auth, getConversations);

module.exports = router;
