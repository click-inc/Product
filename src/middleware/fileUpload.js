const multer = require("multer");
const path = require("path");

//Storage Engin That Tells/Configures Multer for where (destination) and how (filename) to save/upload our files
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../assets");
  },
  filename: (req, file, cb) => {
    const userId = req.headers.userid;
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// The Multer Middleware that is passed to routes that will receive income requests with file data (multipart/formdata)
// You can create multiple middleware each with a different storage engine config so save different files in different locations on server
const upload = multer({ storage: fileStorageEngine });

module.exports = { upload };
