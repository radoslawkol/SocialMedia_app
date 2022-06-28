const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});
const removeTemp = (path) => {
	fs.unlink(path, (err) => {
		if (err) throw err;
	});
};

const uploadtoCloudinary = async (file, path) => {
	return new Promise((resolve) => {
		cloudinary.uploader.upload(
			file.tempFilePath,
			{
				folder: `SocialMediaApp/${path}`,
			},
			(err, res) => {
				if (err) {
					removeTemp(file.tempFilePath);
					return res.status(400).json({
						status: "fail",
						message: "Upload images failed.",
					});
				}
				resolve({
					url: res.secure_url,
				});
			}
		);
	});
};

exports.uploadImages = async (req, res) => {
	try {
		const { path } = req.body;
		let files = Object.values(req.files).flat();
		let images = [];

		for (const file of files) {
			const url = await uploadtoCloudinary(file, path);
			images.push(url);
			removeTemp(file.tempFilePath);
		}

		res.status(200).json({
			success: "success",
			images,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			status: "fail",
			message: err.message,
		});
	}
};
