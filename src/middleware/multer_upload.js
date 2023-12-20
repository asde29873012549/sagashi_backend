import multer from "multer";

const limits = {
	parts: 23, // max number of parts (non-file fields + files)
	fields: 17, // max number of non-file fields
	files: 6,
	fileSize: 8 * 1024 * 1024,
};

const allowMimeType = ["image/jpg", "image/jpeg", "image/png", "image/webp"];

const fileFilter = (_, file, cb) => {
	if (!allowMimeType.includes(file.mimetype)) {
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
