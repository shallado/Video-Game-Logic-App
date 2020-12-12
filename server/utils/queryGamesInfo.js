// find featured game depending on input criteria
const queryGamesInfo = (queriesInfo) => {
  return queriesInfo.map(({ page, type, genres, title, offset }) => {
    const sortBy =
      type === 'featured' ? ' sort created_at desc;' : ' sort created_at desc;';
    const platform =
      page === 'Dashboard' ? '' : ` & platforms.name = "${page}"`;
    const genresInfo = genres.map(
      (genre) =>
        `where genres.name="${genre}" & aggregated_rating >= 75 & cover.url != null`
    );
    const fieldNames =
      'fields name, summary, cover.url, videos.video_id, videos.name, screenshots.url, age_ratings.rating, involved_companies.company.name, genres.name, platforms.name;';
    let queries = '';
    let pagination = '';
    let limit;
    let data;

    queries += platform;

    if (genres && genres.length === 1) {
      if (type === 'moreCategory') {
        if (!!offset) {
          limit = 'limit 400';
          pagination = ` offset ${offset};`;
        } else {
          limit = 'limit 400';
        }
      } else if (type === 'featured') {
        limit = ' limit 2';
      } else {
        limit = 'limit 5';
        pagination = ` offset ${offset};`;
      }
    } else {
      limit = ' limit 10';
    }

    if (title) {
      data = `search "${title}";`;
    } else if (Array.isArray(genresInfo)) {
      queries = genresInfo.map((genreInfo) => `${genreInfo}${platform}`);
      data = queries.map((query) => `${query};${sortBy}${limit};${pagination}`);
    }

    if (Array.isArray(data)) {
      return data.map((queryInfo) => `${queryInfo} ${fieldNames}`);
    }

    return `${data} ${fieldNames}`;
  });
};

module.exports = queryGamesInfo;
