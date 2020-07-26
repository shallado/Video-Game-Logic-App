const featuredGames = require('../utils/featuredGames');

// find featured games to be sent to the client to be used on specific pages
exports.find = (req, res) => {
  const { page } = req.body;

  featuredGames(page)
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send(err));
};
