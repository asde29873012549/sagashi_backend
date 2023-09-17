import multer from "multer";

const limits = {
	parts: 23,
	fields: 17,
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
