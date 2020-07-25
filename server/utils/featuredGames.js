const axios = require('axios');
const { apiKey } = require('../config/igdb');

// find featured game depending on what page is given
const featuredGames = (page) => {
  let query = 'where release_dates.date >= 1580515200';
  let platform = ' & platforms.name = ';

  switch (page) {
    case 'PC (Microsoft Windows)':
      platform += '"PC (Microsoft Windows)"';
      query += platform;
      break;
    case 'PlayStation 4':
      platform += '"PlayStation 4"';
      query += platform;
      break;
    case 'Xbox One':
      platform += '"Xbox One"';
      query += platform;
      break;
    case 'Nintendo Switch':
      platform += '"Nintendo Switch"';
      query += platform;
      break;
    default:
      query += '';
  }

  // communicates to a third party api igdb which is a video game database
  return axios({
    method: 'post',
    url: 'https://api-v3.igdb.com/games',
    headers: {
      'user-key': apiKey,
    },
    data: `${query};sort popularity desc; limit 2; fields name, summary, cover.url, videos.video_id, age_ratings.rating, involved_companies.company.name, genres.name, platforms.name;`,
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

module.exports = featuredGames;
