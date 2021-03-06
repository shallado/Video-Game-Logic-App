// sets the document structure for the videoGames collection
// provided methods that are available to be performed on the videoGame collection
const videoGameModel = (db) => {
  class VideoGame {
    constructor(title) {
      this.title = title.toLowerCase();
    }

    create() {
      const doc = { title: this.title };

      return db
        .collection('videoGames')
        .findOne(doc)
        .then((data) => {
          if (data === null) {
            return db
              .collection('videoGames')
              .insertOne(doc, { w: 1, j: true });
          }

          return data;
        })
        .then((data) => data);
    }

    findOne() {
      return db
        .collection('videoGames')
        .aggregate([
          {
            $match: {
              title: this.title,
            },
          },
          {
            $lookup: {
              from: 'reviews',
              localField: '_id',
              foreignField: 'videoGameId',
              as: 'videoGameReviews',
            },
          },
          {
            $project: {
              'videoGameReviews.reviews': 1,
              title: 1,
            },
          },
        ])
        .toArray()
        .then((data) => data);
    }
  }

  return VideoGame;
};

const videoGameSchema = (db) => {
  return db
    .command({
      collMod: 'videoGames',
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['title'],
          properties: {
            title: {
              bsonType: 'string',
              description: 'must be a string and is required',
            },
          },
        },
      },
    })
    .then(() =>
      console.log({
        message: 'Successfully created videoGames collection schema',
      })
    );
};

const videoGameIndexFields = (db) => {
  return db
    .collection('videoGames')
    .createIndex({ title: -1 }, { unique: true })
    .then((result) => console.log(result));
};

module.exports = {
  videoGameModel,
  videoGameSchema,
  videoGameIndexFields,
};
