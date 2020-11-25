// find featured game depending on input criteria
const queryGamesInfo = (queriesInfo) => {
  return queriesInfo.map(({ page, type, genres, title, offset }) => {
    const sortBy = type === 'featured' ? ' sort popularity desc;' : ' ';
    const platform =
      page === 'Dashboard' ? '' : ` & platforms.name = "${page}"`;
    const fieldNames =
      'fields name, summary, cover.url, videos.video_id, videos.name, screenshots.url, age_ratings.rating, involved_companies.company.name, genres.name, platforms.name;';
    const genresInfo = genres
      ? genres.map((genre) => ` & genres.name="${genre}"`)
      : '';
    let queries = 'where release_dates.date >= 1542931200';
    let pagination = '';
    let limit;
    let data;

    if (genres && genres.length === 1) {
      limit = 'limit 5';
      pagination = ` offset ${offset};`;
    } else if (type === 'featured') {
      limit = ' limit 2';
    } else {
      limit = 'limit 10';
    }

    queries += platform;

    if (title) {
      data = `search "${title}";`;
    } else if (Array.isArray(genresInfo)) {
      queries = genresInfo.map((genreInfo) => `${queries}${genreInfo}`);
      data = queries.map((query) => `${query};${sortBy}${limit};${pagination}`);
    } else {
      queries += genresInfo;
      data = `${queries};${sortBy}${limit};${pagination}`;
    }

    if (Array.isArray(data)) {
      return data.map((queryInfo) => `${queryInfo} ${fieldNames}`);
    }

    return `${data} ${fieldNames}`;
  });
};

module.exports = queryGamesInfo;

631152000;
