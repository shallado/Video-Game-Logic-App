const axios = require('axios');
const { apiKey } = require('../config/igdb');

// find games depending on queryInfo given
const queryGames = (queryInfo) => {
  // communicates to a third party api igdb which is a video game database
  return axios({
    method: 'post',
    url: 'https://api-v3.igdb.com/games',
    headers: {
      'user-key': apiKey,
    },
    data: queryInfo,
  })
    .then((results) => results.data)
    .catch((err) => {
      if (err.response) {
        return {
          data: err.response.data,
          status: err.response.status,
        };
      } else if (err.request) {
        return err.request;
      } else {
        return err.message;
      }
    });
};

module.exports = queryGames;
