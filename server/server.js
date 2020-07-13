const express = require('express');
require('./models');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.listen(port, () =>
  console.log(`Successfully connected to the server on port: ${port}`)
);
