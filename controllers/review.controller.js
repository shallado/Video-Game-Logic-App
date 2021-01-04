const databaseErrorHandling = require('../utils/databaseErrorHandling');

// adds review to an associated video game
exports.create = (req, res) => {
  const { Review, VideoGame } = req.app.locals;
  const { username, review, title } = req.body;
  const videoGame = new VideoGame(title);
  let reviewInfo;
  let videoGameId;

  // creates reviews associated with a video game
  videoGame
    .create()
    .then((data) => {
      if (data.ops) {
        videoGameId = data.ops[0]._id;
      } else {
        videoGameId = data._id;
      }

      reviewInfo = new Review(username, review, videoGameId);

      return reviewInfo.create();
    })
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

exports.editOne = (req, res) => {
  const { Review } = req.app.locals;
  const { id } = req.params;
  const userReview = req.body;

  Review.edit({ ...userReview, videoGameId: id })
    .then((data) => {
      res.send({
        message: 'Successfully reset document structure',
        result: data,
      });
    })
    .catch((err) => {
      const setError = databaseErrorHandling(err);

      res.status(setError.httpStatus).send({ message: setError.description });
    });
};

// finds reviews associated with a user
exports.findAll = (req, res) => {
  const { Review } = req.app.locals;
  const { username } = req.query;

  Review.findAll(username)
    .then((data) => {
      res.send({
        message: 'successfully found the user reviews',
        data,
      });
    })
    .catch((err) => {
      const setError = databaseErrorHandling(err);

      res.status(setError.httpStatus).send({ message: setError.description });
    });
};
