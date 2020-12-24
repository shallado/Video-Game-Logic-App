const { MongoClient, Int32, ObjectID } = require('mongodb');
const { url, dbName } = require('../config/db');
const { reviewModel, reviewSchema, reviewIndexFields } = require('./review');
const { userModel, userSchema, userIndexFields } = require('./user');
const {
  videoGameModel,
  videoGameSchema,
  videoGameIndexFields,
} = require('./videoGame');

const client = new MongoClient(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
let db;

const databaseConnection = (app) => {
  const { locals } = app;

  client
    .connect()
    .then(() => {
      console.log('Successfully connected to the database');
      db = client.db(dbName);
      locals.User = userModel(db, Int32, ObjectID);
      locals.Review = reviewModel(db, Int32, ObjectID);
      locals.VideoGame = videoGameModel(db);

      return client.db(dbName).listCollections().toArray();
    })
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
    })
    .catch((err) => console.log(err.stack));
};

module.exports = databaseConnection;
