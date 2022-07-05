const express = require("express");
const { reactPost, getReacts } = require("../controllers/reactsController");
const auth = require("../middlewares/auth");

const router = express.Router();

router.patch("/", auth, reactPost);
router.get("/:id", auth, getReacts);

module.exports = router;
