const { Int32 } = require('mongodb');

const reviewModel = (db, int32, ObjectID) => {
  class Review {
    constructor(username, review) {
      this.username = username;
      this.review = review;
    }

    // create document structure for reviews associated with a video game
    static create() {
      const doc = {
        // this id is temporary until i work out video game collection logic
        page: int32(1),
        videoGameId: new ObjectID('123456789123456789123456'),
        count: int32(0),
        reviews: [],
      };

      return (
        db
          .collection('reviews')
          // this id is temporary until i work out video game collection logic
          .findOne({ videoGameId: new ObjectID('123456789123456789123456') })
          .then((data) => {
            if (!data) {
              db.collection('reviews')
                .insertOne(doc, { w: 1, j: true })
                .then((dataTwo) => dataTwo)
                .catch((err) => console.log(err));
            }
          })
          .catch((err) => err)
      );
    }

    // reset document structure for reviews associated with a video game and increases page value by 1
    static reset(page) {
      const incrementPage = page + Int32(1);

      return (
        db
          .collection('reviews')
          // this id is temporary until i work out video game collection logic
          .findOneAndUpdate(
            {
              videoGameId: new ObjectID('123456789123456789123456'),
              page: incrementPage,
            },
            {
              $set: {
                count: int32(0),
                reviews: [],
              },
            },
            {
              upsert: true,
              returnOriginal: false,
            }
          )
          .then((data) => data)
          .catch((err) => err)
      );
    }

    // add a review to a existing video game document structure
    addReview() {
      const doc = {
        username: this.username,
        review: this.review,
      };

      return db
        .collection('reviews')
        .findOneAndUpdate(
          {
            // this id is temporary until i work out video game collection logic
            videoGameId: new ObjectID('123456789123456789123456'),
            count: { $lt: 50 },
          },
          {
            $push: {
              reviews: doc,
            },
            $inc: {
              count: int32(1),
            },
          },
          {
            returnOriginal: false,
            projection: {
              reviews: 0,
            },
          }
        )
        .then((data) => data.value)
        .catch((err) => err);
    }
  }

  return Review;
};

// schema and validation
const createReviewTable = (db) => {
  return db
    .command({
      collMod: 'reviews',
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          properties: {
            page: {
              bsonType: 'int',
              description: 'must be an int',
            },
            videoGameId: {
              bsonType: 'objectId',
              description: 'must be a string and is required',
            },
            count: {
              bsonType: 'int',
              description: 'must be an int',
            },
            reviews: {
              bsonType: 'array',
              description: 'must be an array',
              required: ['username', 'review'],
              items: {
                bsonType: 'object',
                properties: {
                  username: {
                    bsonType: 'string',
                    description: 'must be an string and is required',
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

// indexing specific fields
const reviewIndexFields = (db) => {
  return db
    .collection('reviews')
    .createIndexes([
      {
        key: { videoGameId: -1 },
      },
      {
        key: { page: -1 },
      },
      {
        key: { 'reviews.username': -1 },
      },
    ])
    .then((results) => console.log(results))
    .catch((err) => console.log(err));
};

module.exports = {
  createReviewTable,
  reviewIndexFields,
  reviewModel,
};
