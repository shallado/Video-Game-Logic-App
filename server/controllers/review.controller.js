const { Review } = require('../models');
const databaseErrorHandling = require('../utils/databaseErrorHandling');

// adds review to an associated video game
exports.create = (req, res) => {
  const { username, review, title } = req.body;
  const reviewInfo = new Review(username, review);

  // creates reviews associated with a video game
  reviewInfo
    .create(title.toLowerCase())
    .then(() => {
      return reviewInfo.addReview();
    })
    .then((data) => {
      // checks to see if the document field reviews reached the limit for available review to store
      if (data.count === 50) {
        return reviewInfo.reset(data.page);
      }

      return {
        message: 'Successfully added review',
        result: data,
      };
    })
    .then((data) => {
      const { reviews } = data;

      if (reviews && reviews.length === 0) {
        res.send({
          message: 'Successfully reset document structure',
          result: data,
        });
      }

      res.send(data);
    })
    .catch((err) => {
      const setError = databaseErrorHandling(err);

      res.status(setError.httpStatus).send({ message: setError.description });
    });
};

// finds reviews associated with a user
exports.findAll = (req, res) => {
  const { username } = req.query;

  Review.findAll(username)
    .then((data) => {
      if (data.length === 0) {
        throw new APIError(
          'Not Found',
          httpStatusCodes.NOT_FOUND,
          'unable to find user reviews try again'
        );
      }

      res.send(data);
    })
    .catch((err) => {
      const setError = databaseErrorHandling(err);

      res.status(setError.httpStatus).send({ message: setError.description });
    });
};
