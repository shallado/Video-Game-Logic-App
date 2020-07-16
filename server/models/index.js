const { MongoClient, Int32 } = require('mongodb');
const { url, dbName } = require('../config/db');
const { userModel, createUserTable, indexFields } = require('./user');

const client = MongoClient(url, { useUnifiedTopology: true });

client
  .connect()
  .then(() => {
    console.log('Successfully connected to the database');

    client
      .db(dbName)
      .dropDatabase()
      .then(() => {
        indexFields(client.db(dbName));
        createUserTable(client.db(dbName));
      })
      .catch((err) => console.log(err));

    // indexFields(client.db(dbName));
    // createUserTable(client.db(dbName));
  })
  .catch((err) => console.log(err));

const db = client.db(dbName);
const User = userModel(db, Int32);

module.exports = {
  User,
};
