const express = require('express');
const reviewController = require('../controllers/review.controller');

const router = express.Router();

// handle all http requests to the reviews collection
const reviewRouter = (app) => {
  router.post('/', reviewController.create);

  router.get('/', reviewController.findAll);

  router.put('/:id', reviewController.editOne);

  app.use('/reviews', router);
};

module.exports = reviewRouter;
