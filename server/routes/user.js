const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

// handle all http requests to the users collection
const userRouter = (app) => {
  router.post('/', userController.create);

  app.use('/users', router);
};

module.exports = userRouter;
