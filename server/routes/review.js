const express = require('express');
const reviewController = require('../controllers/review.controller');

const router = express.Router();

// handle all http requests to the reviews collection
const reviewRouter = (app) => {
  router.post('/', reviewController.create);

  app.use('/reviews', router);
};

module.exports = reviewRouter;
