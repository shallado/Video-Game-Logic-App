/* eslint-disable consistent-return */
const { validationResult } = require('express-validator');
const { User } = require('../models');

const databaseErrorHandling = require('../utils/databaseErrorHandling');

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

  User.update({ userId }, updates)
    .then((data) => {
      if (data === null) {
        return res.status(401).send({ message: 'unable to find user' });
      }

      res.send({
        message: 'successfully updated user',
        data,
      });
    })
    .catch((err) => {
      const setError = databaseErrorHandling(err);

      res.status(setError.httpStatus).send({ message: setError.description });
    });
};

exports.deleteOne = (req, res) => {
  const { id } = req.params;

  User.deleteOne(id)
    .then((data) => {
      if (data === 0) {
        return res.status(404).send({
          message: 'unable to find user to delete',
        });
      }

      res.send({
        message: 'successfully deleted user',
      });
    })
    .catch((err) => {
      const setError = databaseErrorHandling(err);

      res.status(setError.httpStatus).send({ message: setError.description });
    });
};

exports.addVideoGameWatchList = (req, res) => {
  const { id: userId } = req.params;
  const { videoGame } = req.body;

  User.update({ userId }, { videoGame })
    .then((data) => {
      if (data === null) {
        return res
          .status(404)
          .send({ message: 'unable to add video game to watch list' });
      }

      res.send({
        message: 'successfully added video game to watch list',
      });
    })
    .catch((err) => {
      const setError = databaseErrorHandling(err);

      res.status(setError.httpStatus).send({ message: setError.description });
    });
};

exports.removeVideoGameWatchList = (req, res) => {
  const { id: userId } = req.params;
  const { title } = req.body;

  User.update({ userId, title }, { title })
    .then((data) => {
      if (data === null) {
        return res.status(404).send({ message: 'video game not found' });
      }

      res.send({
        message: 'successfully removed video game',
      });
    })
    .catch((err) => {
      const setError = databaseErrorHandling(err);

      res.status(setError.httpStatus).send({ message: setError.description });
    });
};

// processes user uploaded photo to be stored into the database
exports.uploadProfilePhoto = (req, res) => {
  const { id: userId } = req.params;
  const { path } = req.file;

  User.update({ userId }, { path })
    .then((data) => {
      if (data === null) {
        res.status(401).send({ message: 'unable to find user' });
      }

      res.send({
        message: 'successfully uploaded user profile photo',
        data: {
          ...data,
          path,
        },
      });
    })
    .catch((err) => {
      const setError = databaseErrorHandling(err);

      res.status(setError.httpStatus).send({ message: setError.description });
    });
};
