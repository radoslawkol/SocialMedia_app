const express = require("express");
const {
	createPost,
	getAllPosts,
	comment,
} = require("../controllers/postController");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/", auth, createPost);
router.get("/", auth, getAllPosts);
router.patch("/comment", auth, comment);

module.exports = router;
