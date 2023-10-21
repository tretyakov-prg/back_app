const multer = require("multer");
const uuid = require("uuid");
const path = "./uploads";

storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path);
    },
    filename: (req, file, cb) => {
        cb(null, uuid.v4().toString() + "_" + file.originalname);
    }
});

fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb("Type file is not access", false);
    }
};

upload = multer({
    storage: storage,
    fileFilter,
    limits: 1024 * 1024 * 5
}).single('file');

module.exports = upload;