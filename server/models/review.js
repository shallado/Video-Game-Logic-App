/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const util = require('util');
const { Int32 } = require('mongodb');
const APIError = require('../utils/apiError');
const httpStatusCodes = require('../utils/statusCodes');

const reviewModel = (db, int32, ObjectID) => {
  class Review {
    constructor(username, review) {
      this.username = username;
      this.review = review;
      this.videoGameId = '';
    }

    // create document structure for reviews associated with a video game
    create(title) {
      return db
        .collection('videoGames')
        .findOne({ title })
        .then((data) => {
          if (!data) {
            throw new APIError(
              'Not Found',
              httpStatusCodes.NOT_FOUND,
              'video game not found'
            );
          }

          this.videoGameId = data._id;

          return db
            .collection('reviews')
            .findOne({ videoGameId: new ObjectID(this.videoGameId) });
        })
        .then((data) => {
          const doc = {
            page: int32(1),
            videoGameId: new ObjectID(this.videoGameId),
            count: int32(0),
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
                count: int32(0),
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
        .then((data) => data.value);
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
              reviews: {
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
            $unwind: '$reviews',
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
