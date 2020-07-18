const { Review } = require('../models');

// adds review to an associated video game
exports.create = (req, res) => {
  const { username, review } = req.body;
  const reviewInfo = new Review(username, review);

  // creates reviews associated with a video game
  Review.create()
    .then(() => {
      reviewInfo
        .addReview()
        .then((data) => {
          // checks to see if the document field reviews reached the limit for available review to store
          if (data.reviews.length === 50) {
            Review.reset(data.page)
              .then((dataTwo) => res.send(dataTwo))
              .catch((err) => res.status(500).send(err));
          }

          if (!data) {
            return res.status(404).send({
              message: 'Unable to find video game try again',
            });
          }

          res.send({
            message: 'Successfully added review',
            result: data,
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};
