const fs = require("fs");

const removeTemp = (path) => {
	fs.unlink(path, (err) => {
		if (err) throw err;
	});
};

module.exports = async (req, res, next) => {
	try {
		if (!req.files || Object.values(req.files).flat().length === 0) {
			return res.status(400).json({
				status: "fail",
				message: "No files selected.",
			});
		}
		const files = Object.values(req.files).flat();

		files.forEach((file) => {
			if (
				file.mimetype !== "image/jpeg" &&
				file.mimetype !== "image/png" &&
				file.mimetype !== "image/gif" &&
				file.mimetype !== "image/webp"
			) {
				removeTemp(file.tempFilePath);
				return res.status(400).json({
					status: "fail",
					message: "Unsupported format.",
				});
			}
			if (file.size > 1024 * 1024 * 10) {
				return res.status(400).json({
					status: "fail",
					message: "File size is too large. Max file size 10 Mb.",
				});
			}
		});

		next();
	} catch (err) {
		console.log(err);
		res.status(500).json({
			status: "fail",
			message: err.message,
		});
	}
};
