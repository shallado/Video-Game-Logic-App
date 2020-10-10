const axios = require('axios');
const { clientId, token } = require('../config/igdb');

// find games depending on queryInfo given
const queryGames = (queryInfo) => {
  // communicates to a third party api igdb which is a video game database
  return axios({
    method: 'post',
    url: 'https://api.igdb.com/v4/games',
    headers: {
      'accept': 'application/json',
      'Client-ID': clientId,
      'Authorization': token,
    },
    data: queryInfo,
  }).then((results) => results.data);
};

module.exports = queryGames;
