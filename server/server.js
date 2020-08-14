const express = require('express');
const path = require('path');
require('module-alias/register');
const authRouter = require('./routes/auth');
const igdbRouter = require('./routes/igdb');
const reviewRouter = require('./routes/review');
const userRouter = require('./routes/user');
const videoGameRouter = require('./routes/videoGame');
require('dotenv').config({ path: path.join(__dirname, '../client/.env') });
require('./models');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

authRouter(app);
userRouter(app);
reviewRouter(app);
videoGameRouter(app);
igdbRouter(app);

app.listen(port, () =>
  console.log(`Successfully connected to the server on port: ${port}`)
);
