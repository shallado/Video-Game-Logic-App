const { VideoGame } = require('../models');

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
    .catch((err) =>
      res.status(500).send({
        message: err.message,
        error: err.stack,
      })
    );
};
