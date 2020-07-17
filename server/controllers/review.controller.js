const { Review } = require('../models');

// adds review to an associated video game
exports.create = (req, res) => {
  const { username, review } = req.body;
  const reviewInfo = new Review(username, review);

  Review.create()
    .then(() => {
      reviewInfo
        .addReview()
        .then((data) => {
          // check to see if a video game was found
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
