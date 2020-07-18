const { VideoGame } = require('../models');

// process user input in order to add videoGame info to database
exports.create = (req, res) => {
  const { title } = req.body;

  const videoGame = new VideoGame(title);

  videoGame
    .create()
    .then((data) => {
      // check if it passes schema validations
      if (data.code === 121) {
        return res.status(400).send({ message: 'Document failed validation' });
      }

      // check if its a duplicate email or username value
      if (data.code === 11000) {
        return res.status(400).send({ message: data.message });
      }

      res.send({
        message: 'successfully added videoGame',
        data: data.ops,
      });
    })
    .catch((err) =>
      res.status(500).send({
        message: err.message,
        error: err.stack,
      })
    );
};
