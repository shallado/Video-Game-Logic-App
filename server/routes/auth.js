const express = require('express');
const userController = require('../controllers/user.controller');
const validation = require('../middleware/validation');

const router = express.Router();

const authRouter = (app) => {
  router.post(
    '/signup',
    [validation.inputValidation(), validation.locationCheck],
    userController.signup
  );

  router.post('/signin', validation.passwordChecker, userController.signIn);

  router.post('/signout', userController.signOut);

  app.use('/auth', router);
};

module.exports = authRouter;
