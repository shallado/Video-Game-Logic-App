const express = require('express');
const igdbController = require('../controllers/igdb.controller');

const router = express.Router();

// handle all http requests to the third party api igdb
const igdbRouter = (app) => {
  router.post('/', igdbController.find);

  app.use('/igdb', router);
};

module.exports = igdbRouter;
