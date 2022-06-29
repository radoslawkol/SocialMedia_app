const express = require("express");
const { createPost } = require("../controllers/postController");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/", auth, createPost);

module.exports = router;
