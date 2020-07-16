const createReviewTable = (db) => {
  return db
    .command({
      collMod: 'reviews',
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['title', 'page', 'count', 'reviews'],
          properties: {
            title: {
              bsonType: 'string',
              description: 'must be a string and is required',
            },
            page: {
              bsonType: 'int',
              description: 'must be an int and is required',
            },
            count: {
              bsonType: 'int',
              description: 'must be an int and is required',
            },
            reviews: {
              bsonType: 'array',
              items: {
                bsonType: 'object',
                required: ['user_id', 'review'],
                properties: {
                  user_id: {
                    bsonType: 'objectId',
                    description: 'must be an objectId and is required',
                  },
                  review: {
                    bsonType: 'string',
                    description: 'must be a string and is required',
                  },
                },
              },
            },
          },
        },
      },
    })
    .then(() =>
      console.log({
        message: 'Successfully created reviews collection schema',
      })
    )
    .catch((err) => console.log(err));
};

const reviewIndexFields = (db) => {
  return db
    .collection('reviews')
    .createIndexes([
      {
        key: {
          title: -1,
        },
        unique: true,
      },
      {
        key: {
          'reviews.user_id': -1,
        },
      },
    ])
    .then((results) => console.log(results))
    .catch((err) => console.log(err));
};

module.exports = {
  createReviewTable,
  reviewIndexFields,
};
