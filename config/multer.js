const multer = require('multer');

// upload vào thư mục upload
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/upload");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpeg" ||
            file.mimetype == "image/jpg") {
                cb(null, true);
            } else {
                return cb(new Error("Your file is not image"));
            }
    }
}).single("hinhdaidien");

module.exports = { storage, upload };

