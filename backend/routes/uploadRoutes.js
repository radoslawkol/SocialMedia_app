const express = require("express");
const { uploadImages, listImages } = require("../controllers/uploadController");
const imageUpload = require("../middlewares/imageUpload");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/", auth, imageUpload, uploadImages);
router.post("/listImages", listImages);

module.exports = router;
