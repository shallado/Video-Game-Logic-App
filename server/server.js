const express = require('express');
const authRouter = require('./routes/auth');
const igdbRouter = require('./routes/igdb');
const mapRouter = require('./routes/map');
const reviewRouter = require('./routes/review');
const userRouter = require('./routes/user');
const videoGameRouter = require('./routes/videoGame');
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
mapRouter(app);

app.listen(port, () =>
  console.log(`Successfully connected to the server on port: ${port}`)
);
