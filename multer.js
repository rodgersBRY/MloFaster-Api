const path = require("path");
const multer = require("multer");
const fs = require("fs");

const dest = (req, file, cb) => {
  const uploadPath = "./public";

  // use fs create the directory if it doesn't exist
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
  }
  cb(null, uploadPath);
};

const filename = (req, file, cb) => {
  cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
};

const storage = multer.diskStorage({
  destination: dest,
  filename: filename,
});

exports.imageUpload = multer({
  storage: storage,
  limits: {
    fileSize: 3000000, // 3MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
      return cb(new Error("Only image files are allowed!"));
    }
    cb(undefined, true);
  },
}).single("image");
