const express = require('express');
const videoGame = require('../controllers/videoGame.controller');

const router = express.Router();

// handle all http requests to the videoGames collection
const videoGameRouter = (app) => {
  router.post('/', videoGame.create);

  app.use('/video-games', router);
};

module.exports = videoGameRouter;
