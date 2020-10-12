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
        .insertOne(doc, { w: 1, j: true })
        .then((results) => results);
    }

    findOne() {
      const doc = { title: this.title };

      return db
        .collection('videoGames')
        .findOne(doc)
        .then((results) => results);
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
