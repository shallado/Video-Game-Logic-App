const { MongoClient } = require('mongodb');
const { url, dbName } = require('../config/db');

const client = MongoClient(url, { useUnifiedTopology: true });

client
  .connect()
  .then(() => console.log('Successfully connected to the database'))
  .catch((err) => console.log(err));

const db = client.db(dbName);

module.exports = {
  db,
};
