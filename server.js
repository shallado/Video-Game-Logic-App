const express = require('express');
const path = require('path');
require('dotenv').config();
const authRouter = require('./routes/auth');
const igdbRouter = require('./routes/igdb');
const mapRouter = require('./routes/map');
const reviewRouter = require('./routes/review');
const userRouter = require('./routes/user');
const videoGameRouter = require('./routes/videoGame');
const databaseConnection = require('./models');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  if (req.secure) {
    next();
  } else {
    res.redirect(`https://${req.headers.host}${req.url}`);
  }
});
app.use(express.static(path.join(__dirname, 'client', 'build')));

databaseConnection(app);

authRouter(app);
userRouter(app);
reviewRouter(app);
videoGameRouter(app);
igdbRouter(app);
mapRouter(app);

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
);

app.listen(port, () =>
  console.log(`Successfully connected to the server on port: ${port}`)
);
