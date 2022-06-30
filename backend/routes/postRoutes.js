const express = require("express");
const { createPost, getAllPosts } = require("../controllers/postController");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/", auth, createPost);
router.get("/", auth, getAllPosts);

module.exports = router;
