const queryGamesInfo = require('../utils/queryGamesInfo');
const queryGames = require('../utils/queryGames');

// find featured games to be sent to the client to be used on specific pages
exports.find = (req, res) => {
  const queriesInfo = req.body;
  const igdbQueriesInfo = queryGamesInfo(queriesInfo);
  const queryResults = queryGames(igdbQueriesInfo);

  Promise.all(queryResults)
    .then((data) => {
      if (data.length === 0) {
        res.status(404).send({
          message: 'no video games found',
        });
      }

      res.send(data);
    })
    .catch((err) => {
      let error;

      if (err.request) {
        error = err.request;
      } else {
        error = err.message;
      }

      res.status(500).send(error);
    });
};
