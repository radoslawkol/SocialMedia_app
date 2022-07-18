const express = require("express");
const {
	createPost,
	getAllPosts,
	comment,
	savePost,
	deletePost,
} = require("../controllers/postController");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/", auth, createPost);
router.get("/", auth, getAllPosts);
router.patch("/comment", auth, comment);
router.patch("/save", auth, savePost);
router.delete("/:id", auth, deletePost);

module.exports = router;
