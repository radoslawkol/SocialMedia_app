const express = require("express");
const { createPost } = require("../controllers/postController");

const router = express.Router();

router.post("/", createPost);

module.exports = router;
