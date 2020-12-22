// find featured game depending on input criteria
const queryGamesInfo = (queriesInfo) => {
  return queriesInfo.map(({ page, type, genres, title, offset }) => {
    const fieldNames =
      'fields name, summary, cover.url, videos.video_id, videos.name, screenshots.url, age_ratings.rating, involved_companies.company.name, genres.name, platforms.name;';
    let data;

    if (title) {
      data = `search "${title}"; ${fieldNames}`;
    } else {
      const sortBy =
        type === 'featured'
          ? ' sort created_at desc;'
          : ' sort created_at desc;';
      const platform =
        page === 'Dashboard' ? '' : ` & platforms.name = "${page}"`;
      let pagination = '';
      let limit;

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

      data = genres.map(
        (genre) =>
          `where genres.name="${genre}" & aggregated_rating >= 75 & cover.url != null${platform};${sortBy}${limit};${pagination} ${fieldNames}`
      );
    }

    return data;
  });
};

module.exports = queryGamesInfo;
