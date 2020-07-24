const multer = require('multer');
const CustomStorage = require('../utilis/customStorage');
const { bucketName } = require('../config/googleCloudStorage');

const storage = new CustomStorage({
  destination(req, file, cb) {
    cb(null, bucketName);
  },
  filename(req, file, cb) {
    cb(null, `${req.params.id}-${file.fieldname}-${Date.now()}.jpg`);
  },
});

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith('image')) {
    return cb('please upload an image', false);
  }

  cb(null, true);
};

const limits = { fileSize: 100000 };

const uploadImage = multer({ storage, fileFilter, limits });

module.exports = uploadImage;
