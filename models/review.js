/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const reviewModel = (db, Int32, ObjectID) => {
  class Review {
    constructor(username, review, videoGameId) {
      this.username = username;
      this.review = review;
      this.videoGameId = videoGameId;
    }

    // create document structure for reviews associated with a video game
    create() {
      return db
        .collection('reviews')
        .findOne({ videoGameId: new ObjectID(this.videoGameId) })
        .then((data) => {
          const doc = {
            page: Int32(1),
            videoGameId: new ObjectID(this.videoGameId),
            count: Int32(0),
            reviews: [],
          };

          if (!data) {
            return db.collection('reviews').insertOne(doc, { w: 1, j: true });
          }
        })
        .then((data) => data);
    }

    // reset document structure for reviews associated with a video game and increases page value by 1
    reset(page) {
      const incrementPage = page + Int32(1);

      return (
        db
          .collection('reviews')
          // this id is temporary until i work out video game collection logic
          .findOneAndUpdate(
            {
              videoGameId: new ObjectID(this.videoGameId),
              page: incrementPage,
            },
            {
              $set: {
                count: Int32(0),
                reviews: [],
              },
            },
            {
              upsert: true,
              returnOriginal: false,
            }
          )
          .then((data) => data.value)
      );
    }

    // add a review to a existing video game document structure
    addReview() {
      const doc = {
        _id: new ObjectID(),
        username: this.username,
        review: this.review,
      };

      return db
        .collection('reviews')
        .findOneAndUpdate(
          {
            videoGameId: new ObjectID(this.videoGameId),
            count: { $lt: 50 },
          },
          {
            $push: {
              reviews: doc,
            },
            $inc: {
              count: Int32(1),
            },
          },
          {
            returnOriginal: false,
            projection: {
              reviews: 0,
            },
          }
        )
        .then((data) => data.value);
    }

    static edit(userReviews) {
      const { videoGameId, review, username } = userReviews;

      return db
        .collection('reviews')
        .updateOne(
          {
            videoGameId: new ObjectID(videoGameId),
            'reviews.username': username,
          },
          {
            $set: { 'reviews.$.review': review },
          }
        )
        .then((data) => data);
    }

    // finds user reviews
    static findAll(username) {
      return db
        .collection('reviews')
        .aggregate([
          {
            $match: {
              'reviews.username': username,
            },
          },
          {
            $project: {
              _id: 0,
              videoGameId: 1,
              reviewInfo: {
                $filter: {
                  input: '$reviews',
                  as: 'review',
                  cond: {
                    $regexMatch: {
                      input: '$$review.username',
                      regex: `${username}`,
                    },
                  },
                },
              },
            },
          },
          {
            $unwind: '$reviewInfo',
          },
          {
            $lookup: {
              from: 'videoGames',
              localField: 'videoGameId',
              foreignField: '_id',
              as: 'videoGame',
            },
          },
          {
            $project: {
              'videoGame._id': 0,
            },
          },
          {
            $unwind: '$videoGame',
          },
        ])
        .toArray()
        .then((data) => data);
    }
  }

  return Review;
};

// schema and validation
const reviewSchema = (db) => {
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
              description: 'must be a objectId',
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
    );
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
    .then((results) => console.log(results));
};

module.exports = {
  reviewSchema,
  reviewIndexFields,
  reviewModel,
};
