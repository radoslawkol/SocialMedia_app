const express = require("express");
const { uploadImages } = require("../controllers/uploadController");
const imageUpload = require("../middlewares/imageUpload");

const router = express.Router();

router.post("/", imageUpload, uploadImages);

module.exports = router;
