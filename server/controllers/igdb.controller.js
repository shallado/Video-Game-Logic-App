const queryGamesInfo = require('../utils/queryGamesInfo');
const queryGames = require('../utils/queryGames');

// find featured games to be sent to the client to be used on specific pages
exports.find = (req, res) => {
  const { page, type = undefined, genre = undefined } = req.body;
  const queryInfo = queryGamesInfo(page, type, genre);

  queryGames(queryInfo)
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send(err));
};
