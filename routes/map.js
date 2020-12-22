const express = require('express');
const mapController = require('../controllers/map.controller');

const router = express.Router();

const mapRouter = (app) => {
  router.get('/', mapController.getPointsOfInterest);

  app.use('/map', router);
};

module.exports = mapRouter;
