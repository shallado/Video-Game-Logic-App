const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

// handle all http requests to the users collection
const userRouter = (app) => {
  router.post('/', userController.create);

  router.put('/:id', userController.updateOne);

  app.use('/users', router);
};

module.exports = userRouter;
