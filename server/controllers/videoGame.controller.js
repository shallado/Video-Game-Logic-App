const { VideoGame } = require('../models');
const databaseErrorHandling = require('../utils/databaseErrorHandling');

// process user input in order to add videoGame info to database
exports.create = (req, res) => {
  const { title } = req.body;
  const videoGame = new VideoGame(title);

  videoGame
    .findOne()
    .then((data) => {
      if (!data) {
        return videoGame.create();
      }

      res.send({
        message: 'video game is in the database',
      });
    })
    .then((data) => {
      res.send({
        message: 'successfully added video game',
        data: data.ops,
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
          data,
        });
      }

      res.status(404).send({
        message: 'unable to find video game',
      });
    })
    .catch((err) => {
      const setError = databaseErrorHandling(err);

      res.status(setError.httpStatus).send({ message: setError.description });
    });
};
