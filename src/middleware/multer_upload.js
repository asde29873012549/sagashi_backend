import multer from "multer";

const limits = {
	parts: 15,
	fields: 9,
	files: 6,
	fileSize: 5 * 1024 * 1024,
};

const fileFilter = (_, file, cb) => {
	if (
		file.mimetype !== "image/jpg" &&
		file.mimetype !== "image/jpeg" &&
		file.mimetype !== "image/png"
	) {
		cb(null, false);
	}
	cb(null, true);
};

const upload = multer({
	storage: multer.memoryStorage(),
	limits,
	fileFilter,
});

export default upload;
