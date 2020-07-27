const axios = require('axios');
const { apiKey } = require('../config/igdb');

// find featured game depending on input criteria
const queryGamesInfo = (page, type, genre) => {
  const limit = type === 'featured' ? ' limit 2' : 'limit 40';
  const sortBy = type === 'featured' ? ' sort popularity desc;' : ' ';
  let query = 'where release_dates.date >= 1580515200';
  let platform = page === 'Dashboard' ? '' : ` & platforms.name = "${page}"`;
  let genreInfo = genre ? ` & genres.name="${genre}"` : '';

  query += platform;
  query += genreInfo;

  const data = `${query};${sortBy}${limit}; fields name, summary, cover.url, videos.video_id, age_ratings.rating, involved_companies.company.name, genres.name, platforms.name;`;

  return data;
};

module.exports = queryGamesInfo;
