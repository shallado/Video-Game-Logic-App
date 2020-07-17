const express = require('express');
const reviewRouter = require('./routes/review');
const userRouter = require('./routes/user');
require('./models');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

userRouter(app);
reviewRouter(app);

app.listen(port, () =>
  console.log(`Successfully connected to the server on port: ${port}`)
);
