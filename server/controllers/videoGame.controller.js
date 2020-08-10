const { VideoGame } = require('../models');
const APIError = require('../utils/apiError');
const httpStatusCodes = require('../utils/statusCodes');
const databaseErrorHandling = require('../utils/databaseErrorHandling');

// process user input in order to add videoGame info to database
exports.create = (req, res) => {
  const { title } = req.body;

  const videoGame = new VideoGame(title);

  videoGame
    .create()
    .then((data) => {
      res.send({
        message: 'successfully added videoGame',
        data: data.ops,
      });
    })
    .catch((err) => {
      const setError = databaseErrorHandling(err);

      res.status(setError.httpStatus).send({ message: setError.description });
    });
};
