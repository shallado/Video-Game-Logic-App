const axios = require('axios');
const esrbRatingConvert = require('./esrbRatingConvert');
const { clientId, token } = require('../config/igdb');

// find games depending on queryInfo given
const queryGames = (igdbQueriesInfo) => {
  return igdbQueriesInfo.map((igdbQueryInfo) => {
    let videoGamesConverted;

    // communicates to a third party api igdb which is a video game database
    if (Array.isArray(igdbQueryInfo)) {
      const requests = igdbQueryInfo.map((query) => ({
        method: 'post',
        url: 'https://api.igdb.com/v4/games',
        headers: {
          'accept': 'application/json',
          'Client-ID': clientId,
          'Authorization': token,
        },
        data: query,
      }));

      const requestOne = requests[0];
      const requestTwo = requests[1];
      const requestThree = requests[2];
      const requestFour = requests[3];
      const requestFive = requests[4];
      const requestSix = requests[5];

      return axios
        .all([
          axios(requestOne),
          axios(requestTwo),
          axios(requestThree),
          axios(requestFour),
          axios(requestFive),
          axios(requestSix),
        ])
        .then(
          axios.spread(
            (
              response1,
              response2,
              response3,
              response4,
              response5,
              response6
            ) => {
              const videoGamesInfo = [
                response1.data,
                response2.data,
                response3.data,
                response4.data,
                response5.data,
                response6.data,
              ];

              return videoGamesInfo.map((videoGameInfo) => {
                videoGamesConverted = esrbRatingConvert(videoGameInfo);

                return videoGamesConverted;
              });
            }
          )
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
