const express = require('express');
const userController = require('../controllers/user.controller');
const uploadImage = require('../middleware/upload');

const router = express.Router();

// handle all http requests to the users collection
const userRouter = (app) => {
  router.post('/', userController.create);

  router.get('/', userController.signIn);

  router.put(
    '/:id/profilePhoto/',
    uploadImage.single('profile'),
    userController.uploadProfilePhoto
  );

  router.put('/:id', userController.updateOne);

  app.use('/users', router);
};

module.exports = userRouter;
