// find featured game depending on input criteria
const queryGamesInfo = (queriesInfo) => {
  return queriesInfo.map(({ page, type, genres, title }) => {
    const limit = type === 'featured' ? ' limit 2' : 'limit 40';
    const sortBy = type === 'featured' ? ' sort popularity desc;' : ' ';
    const platform =
      page === 'Dashboard' ? '' : ` & platforms.name = "${page}"`;
    const fieldNames =
      'fields name, summary, cover.url, videos.video_id, videos.name, screenshots.url, age_ratings.rating, involved_companies.company.name, genres.name, platforms.name;';
    const genresInfo = genres
      ? genres.map((genre) => ` & genres.name="${genre}"`)
      : '';
    let queries = 'where release_dates.date >= 1580515200';
    let data;

    queries += platform;

    if (title) {
      data = `search "${title}";`;
    } else if (Array.isArray(genresInfo)) {
      queries = genresInfo.map((genreInfo) => `${queries}${genreInfo}`);
      data = queries.map((query) => `${query};${sortBy}${limit};`);
    } else {
      queries += genresInfo;
      data = `${queries};${sortBy}${limit};`;
    }

    if (Array.isArray(data)) {
      return data.map((queryInfo) => `${queryInfo} ${fieldNames}`);
    }

    return `${data} ${fieldNames}`;
  });
};

module.exports = queryGamesInfo;
