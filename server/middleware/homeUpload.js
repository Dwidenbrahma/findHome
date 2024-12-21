const multer = require("multer");
const path = require("path");

// Function to check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

// Multer storage configuration
const homeStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/home-uploads-pics");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Multer upload configuration
const homeUpload = multer({
  storage: homeStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).array("images", 10);

module.exports = homeUpload;
