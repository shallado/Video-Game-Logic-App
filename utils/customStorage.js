/* eslint-disable no-underscore-dangle */
const { Storage } = require('@google-cloud/storage');
const sharp = require('sharp');

// custom storage that is used by middleware multer for handling image uploads
class CustomStorage {
  constructor(opts) {
    this.getDestination = opts.destination;
    this.getFilename = opts.filename;
    this.bucket = '';
  }

  _handleFile(req, file, cb) {
    this.getDestination(req, file, (errOne, bucketName) => {
      if (errOne) {
        return cb(errOne, null);
      }
      // handles the image data so it can be stored in google cloud storage
      this.getFilename(req, file, (errTwo, filename) => {
        if (errTwo) {
          return cb(errTwo, null);
        }

        const storage = new Storage();
        this.bucket = storage.bucket(bucketName);
        const fileBucket = this.bucket.file(filename);
        const outStream = fileBucket.createWriteStream({
          metadata: {
            cacheControl: 'no-cache, max-age=0',
          },
        });
        const transformer = sharp().resize(180, 180).toFormat('jpeg');

        file.stream.pipe(transformer).pipe(outStream);
        outStream
          .on('error', (errThree) => cb(errThree))
          .on('finish', () =>
            cb(null, {
              path: `https://storage.googleapis.com/${bucketName}/${filename}`,
              filename,
            })
          );
      });
    });
  }

  _removeFile(req, file, cb) {
    const fileBucket = this.bucket.file(file.filename);

    fileBucket
      .delete()
      .then((apiResponse) => cb(null, apiResponse))
      .catch((err) => cb(err));
  }
}

module.exports = CustomStorage;
