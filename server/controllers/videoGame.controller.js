const { VideoGame } = require('../models');
const databaseErrorHandling = require('../utils/databaseErrorHandling');

// process user input in order to add videoGame info to database
exports.create = (req, res) => {
  const { title } = req.body;
  const videoGame = new VideoGame(title);

  return videoGame
    .create()
    .then((data) => {
      if (!data) {
        return res.send({ message: 'video game has been already added' });
      }

      res.send({
        message: 'successfully added video game',
        data: data.ops[0],
      });
    })
    .catch((err) => {
      const setError = databaseErrorHandling(err);

      res.status(setError.httpStatus).send({ message: setError.description });
    });
};

exports.findOne = (req, res) => {
  const { title } = req.query;
  const videoGame = new VideoGame(title);

  videoGame
    .findOne()
    .then((data) => {
      if (data.length > 0) {
        return res.send({
          message: 'successfully found video game',
          data: {
            ...data[0],
            videoGameReviews: data[0].videoGameReviews[0].reviews,
          },
        });
      }

      res.send({
        message: 'successfully found video game and no reviews',
        data: null,
      });
    })
    .catch((err) => {
      const setError = databaseErrorHandling(err);

      res.status(setError.httpStatus).send({ message: setError.description });
    });
};
