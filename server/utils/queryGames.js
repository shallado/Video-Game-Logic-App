const axios = require('axios');
const esrbRatingConvert = require('./esrbRatingConvert');
const { clientId, token } = require('../config/igdb');

// find games depending on queryInfo given
const queryGames = (igdbQueriesInfo) => {
  return igdbQueriesInfo.map((igdbQueryInfo) => {
    let videoGamesConverted;

    // communicates to a third party api igdb which is a video game database
    if (Array.isArray(igdbQueryInfo)) {
      const requests = igdbQueryInfo.map((query) =>
        axios({
          method: 'post',
          url: 'https://api.igdb.com/v4/games',
          headers: {
            'accept': 'application/json',
            'Client-ID': clientId,
            'Authorization': token,
          },
          data: query,
        })
      );

      return axios.all(requests).then(
        axios.spread((...responses) => {
          let videoGamesInfo;

          if (responses.length === 1) {
            videoGamesInfo = [responses[0].data];
          } else {
            videoGamesInfo = [
              responses[0].data,
              responses[1].data,
              responses[2].data,
              responses[3].data,
              responses[4].data,
              responses[5].data,
            ];
          }

          return videoGamesInfo.map((videoGameInfo) => {
            videoGamesConverted = esrbRatingConvert(videoGameInfo);

            return videoGamesConverted;
          });
        })
      );
    }

    return axios({
      method: 'post',
      url: 'https://api.igdb.com/v4/games',
      headers: {
        'accept': 'application/json',
        'Client-ID': clientId,
        'Authorization': token,
      },
      data: igdbQueryInfo,
    }).then((response) => {
      videoGamesConverted = esrbRatingConvert(response.data);

      return videoGamesConverted;
    });
  });
};

module.exports = queryGames;
