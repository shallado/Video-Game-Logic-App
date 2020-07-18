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
          if (data.count === 50) {
            return Review.reset(data.page)
              .then((dataTwo) =>
                res.send({
                  message: 'Successfully reset document structure',
                  result: dataTwo,
                })
              )
              .catch((err) =>
                res.status(500).send({
                  message: err.message,
                  error: err.stack,
                })
              );
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
        .catch((err) =>
          res.status(500).send({
            message: err.message,
            error: err.stack,
          })
        );
    })
    .catch((err) => console.log(err));
};
