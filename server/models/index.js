const { MongoClient, Int32 } = require('mongodb');
const { url, dbName } = require('../config/db');
const { userModel, createUserTable, userIndexFields } = require('./user');
const { createReviewTable, reviewIndexFields } = require('./review');

const client = MongoClient(url, { useUnifiedTopology: true });

client.connect().then(() => {
  console.log('Successfully connected to the database');

  client
    .db(dbName)
    .dropDatabase()
    .then(() => userIndexFields(client.db(dbName)))
    .then(() => reviewIndexFields(client.db(dbName)))
    .then(() => createUserTable(client.db(dbName)))
    .then(() => createReviewTable(client.db(dbName)))
    .catch((err) => console.log(err));
});

const db = client.db(dbName);
const User = userModel(db, Int32);

module.exports = {
  User,
};
