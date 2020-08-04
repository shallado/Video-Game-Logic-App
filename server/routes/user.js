const express = require('express');
const userController = require('../controllers/user.controller');
const uploadImage = require('../middleware/upload');
const validation = require('../middleware/validation');

const router = express.Router();

// handle all http requests to the users collection
const userRouter = (app) => {
  router.post(
    '/',
    validation.inputValidation(),
    validation.locationCheck,
    userController.create
  );

  router.get(
    '/',
    validation.userCheck,
    validation.isPasswordValid,
    userController.signIn
  );

  router.put(
    '/:id/profilePhoto/',
    validation.userCheck,
    uploadImage.single('profile'),
    userController.uploadProfilePhoto
  );

  router.put(
    '/:id',
    validation.userCheck,
    validation.locationCheck,
    userController.updateOne
  );

  app.use('/users', router);
};

module.exports = userRouter;
