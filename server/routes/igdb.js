const express = require('express');
const igdbController = require('../controllers/igdb.controller');

const Router = express.Router();

// handle all http requests to the third party api igdb
const igdbRouter = (app) => {
  Router.get('/', igdbController.find);

  app.use('/igdb', Router);
};

module.exports = igdbRouter;
