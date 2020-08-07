/* eslint-disable consistent-return */
const { validationResult } = require('express-validator');
const { User } = require('../models');
const APIError = require('../utils/apiError');
const httpStatusCodes = require('../utils/statusCodes');
const { comparePassword } = require('../utils/password');
const databaseErrorHandling = require('../utils/databaseErrorHandling');

// process user input in order to add user info to database
exports.create = (req, res) => {
  const results = validationResult(req);
  const hasErrors = results.isEmpty();
  const error = results.array()[0];

  // handles errors coming from validation middleware
  if (!hasErrors) {
    if (error.param === 'city') {
      const setError = databaseErrorHandling(error);

      res.status(setError.httpStatus).send({ message: setError.description });
    } else {
      res.status(400).send(error);
    }

    return;
  }

  const userInfo = req.body;
  const user = new User(userInfo);

  user
    .create()
    .then((data) => {
      const message = 'successfully added user';

      res.send({
        message,
        data,
      });
    })
    .catch((err) => {
      const setError = databaseErrorHandling(err);

      res.status(setError.httpStatus).send({ message: setError.description });
    });
};

// updates user info that is stored in the database
exports.updateOne = (req, res) => {
  const results = validationResult(req);
  const hasErrors = results.isEmpty();
  const error = results.array()[0];

  // handles errors coming from validation middleware
  if (!hasErrors) {
    const setError = databaseErrorHandling(error);

    return res
      .status(setError.httpStatus)
      .send({ message: setError.description });
  }

  const { id: userId } = req.params;
  const updates = req.body;

  User.update(userId, updates)
    .then((data) => {
      const message = 'successfully updated user';

      res.send({
        message,
        data,
      });
    })
    .catch((err) => {
      const setError = databaseErrorHandling(err);

      res.status(setError.httpStatus).send({ message: setError.description });
    });
};

// process user credentials and validates users input
exports.signIn = (req, res) => {
  const { email, password } = req.body;

  return User.find({ email })
    .then((data) => {
      if (!data) {
        throw new APIError(
          'Not Found',
          httpStatusCodes.NOT_FOUND,
          'unable to find user'
        );
      }

      // compares user input password to hash password in database
      return comparePassword(password, data.password);
    })
    .then(() => {
      res.send({ message: 'Successfully login' });
    })
    .catch((err) => {
      const setError = databaseErrorHandling(err);

      res.status(setError.httpStatus).send({ message: setError.description });
    });
};

// processes user uploaded photo to be stored into the database
exports.uploadProfilePhoto = (req, res) => {
  const { id } = req.params;

  User.upload(id, req.file)
    .then((data) => {
      const message = 'successfully uploaded user profile photo';

      res.send({
        message,
        data,
      });
    })
    .catch((err) => {
      const setError = databaseErrorHandling(err);

      res.status(setError.httpStatus).send({ message: setError.description });
    });
};
