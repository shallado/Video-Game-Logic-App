const express = require('express');
const userController = require('../controllers/user.controller');
const uploadImage = require('../middleware/upload');
const validation = require('../middleware/validation');

const router = express.Router();

// handle all http requests to the users collection
const userRouter = (app) => {
  router.put(
    '/:id/profilePhoto/',
    uploadImage.single('profile'),
    userController.uploadProfilePhoto
  );

  router.put('/:id', validation.locationCheck, userController.updateOne);

  app.use('/users', router);
};

module.exports = userRouter;
