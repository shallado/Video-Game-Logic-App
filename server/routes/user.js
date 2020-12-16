const express = require('express');
const userController = require('../controllers/user.controller');
const { uploadFiles } = require('../middleware/upload');
const { hashPassword } = require('../middleware/password');
const validation = require('../middleware/validation');

const router = express.Router();

// handle all http requests to the users collection
const userRouter = (app) => {
  router.put(
    '/:id/profilePhoto/',
    uploadFiles,
    userController.uploadProfilePhoto
  );

  router.put('/:id', validation.locationCheck, userController.updateOne);

  router.put(
    '/:id/password',
    validation.inputPasswordValidation(),
    validation.passwordChecker,
    hashPassword,
    userController.updatePassword
  );

  router.delete('/:id', userController.deleteOne);

  router.put('/:id/addWatchList', userController.addVideoGameWatchList);

  router.put('/:id/removeWatchList', userController.removeVideoGameWatchList);

  app.use('/users', router);
};

module.exports = userRouter;
