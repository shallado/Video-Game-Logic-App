const esrbRatingConvert = (queryResults) => {
  const ratingScale = new Map();
  const gameRating = [
    'Three',
    'Seven',
    'Twelve',
    'Sixteen',
    'Eighteen',
    'RP',
    'EC',
    'E',
    'E10',
    'T',
    'M',
    'AO',
  ];

  for (let i = 1; i < 13; i += 1) {
    ratingScale.set(i, gameRating[i - 1]);
  }

  for (let queryResult of queryResults) {
    const { age_ratings } = queryResult;

    if (age_ratings) {
      for (let age_rating of age_ratings) {
        age_rating.rating = ratingScale.get(age_rating.rating);
      }
    }
  }

  return queryResults;
};

module.exports = esrbRatingConvert;
