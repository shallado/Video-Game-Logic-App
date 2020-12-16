const express = require('express');
const authController = require('../controllers/auth.controller');
const { hashPassword } = require('../middleware/password');
const validation = require('../middleware/validation');

const router = express.Router();

const authRouter = (app) => {
  router.post(
    '/signup',
    [validation.inputValidation(), validation.locationCheck],
    hashPassword,
    authController.signup
  );

  router.post('/signin', validation.passwordChecker, authController.signIn);

  router.post('/signout', authController.signOut);

  app.use('/auth', router);
};

module.exports = authRouter;
