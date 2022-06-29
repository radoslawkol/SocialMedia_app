const express = require("express");
const { uploadImages } = require("../controllers/uploadController");
const imageUpload = require("../middlewares/imageUpload");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/", auth, imageUpload, uploadImages);

module.exports = router;
