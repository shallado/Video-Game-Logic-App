const { MongoClient, Int32, ObjectID } = require('mongodb');
const { url, dbName } = require('../config/db');
const { reviewModel, reviewSchema, reviewIndexFields } = require('./review');
const { userModel, userSchema, userIndexFields } = require('./user');
const {
  videoGameModel,
  videoGameSchema,
  videoGameIndexFields,
} = require('./videoGame');

const client = MongoClient(url, { useUnifiedTopology: true });

client.connect().then(() => {
  console.log('Successfully connected to the database');

  // production purposes
  client
    .db(dbName)
    .dropDatabase()
    .then(() => userIndexFields(client.db(dbName)))
    .then(() => reviewIndexFields(client.db(dbName)))
    .then(() => videoGameIndexFields(client.db(dbName)))
    .then(() => userSchema(client.db(dbName)))
    .then(() => reviewSchema(client.db(dbName)))
    .then(() => videoGameSchema(client.db(dbName)))
    .catch((err) => console.log(err));
});

const db = client.db(dbName);
const User = userModel(db, Int32);
const Review = reviewModel(db, Int32, ObjectID);
const VideoGame = videoGameModel(db);

module.exports = {
  Review,
  User,
  VideoGame,
};
