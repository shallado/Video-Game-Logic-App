const { MongoClient, Int32, ObjectID, Binary } = require('mongodb');
const { url, dbName } = require('../config/db');
const { reviewModel, reviewSchema, reviewIndexFields } = require('./review');
const { userModel, userSchema, userIndexFields } = require('./user');
const {
  videoGameModel,
  videoGameSchema,
  videoGameIndexFields,
} = require('./videoGame');

const client = new MongoClient(url, { useUnifiedTopology: true });
let db;
let User;
let Review;
let VideoGame;

client.connect().then(() => {
  console.log('Successfully connected to the database');

  client
    .db(dbName)
    .listCollections()
    .toArray()
    .then((collections) => {
      if (collections.length === 0) {
        userIndexFields(client.db(dbName))
          .then(() => reviewIndexFields(client.db(dbName)))
          .then(() => videoGameIndexFields(client.db(dbName)))
          .then(() => userSchema(client.db(dbName)))
          .then(() => reviewSchema(client.db(dbName)))
          .then(() => videoGameSchema(client.db(dbName)))
          .catch((err) => console.log(err.stack));
      }

      db = client.db(dbName);
      User = userModel(db, Int32, ObjectID, Binary);
      Review = reviewModel(db, Int32, ObjectID);
      VideoGame = videoGameModel(db);
    })
    .catch((err) => console.log(err.stack));
});

module.exports = {
  Review,
  User,
  VideoGame,
};
