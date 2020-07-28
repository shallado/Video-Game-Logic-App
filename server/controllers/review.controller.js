const { Review } = require('../models');

// adds review to an associated video game
exports.create = (req, res) => {
  const { username, review, title } = req.body;
  const reviewInfo = new Review(username, review);

  // creates reviews associated with a video game
  reviewInfo
    .create(title)
    .then((data) => {
      const err = data;

      if (data instanceof Error) {
        throw err;
      }

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
      if (err.number === 404) {
        res.status(404).send(err.stack);
      }

      res.status(500).send(err.stack);
    });
};

// finds reviews associated with a user
exports.findAll = (req, res) => {
  const { username } = req.body;

  Review.findAll(username)
    .then((data) => {
      if (data.length === 0) {
        return res
          .status(404)
          .send({ message: 'Unable to find user reviews try again' });
      }

      res.send(data);
    })
    .catch((err) => res.status(500).send(err.stack));
};
