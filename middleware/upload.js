const multer = require('multer');
const CustomStorage = require('../utils/customStorage');

const storage = new CustomStorage({
  destination(req, file, cb) {
    cb(null, 'vgl-app.appspot.com');
  },
  filename(req, file, cb) {
    cb(null, `${req.params.id}-${file.fieldname}.jpg`);
  },
});

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith('image')) {
    return cb('please upload an image', false);
  }

  cb(null, true);
};

const upload = multer({ storage, fileFilter });
const uploadImage = upload.single('profile');

const uploadFiles = (req, res, next) => {
  uploadImage(req, res, (err) => {
    if (err) {
      return res.status(401).send({ message: err });
    }

    next();
  });
};

module.exports = {
  uploadFiles,
};
