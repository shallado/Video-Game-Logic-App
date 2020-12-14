/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { User } = require('../models');
const { secretKey } = require('../config/jwt');
const databaseErrorHandling = require('../utils/databaseErrorHandling');

// process user input in order to add user info to database
exports.signup = (req, res) => {
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
      res.send({
        message: 'successfully added user',
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

exports.addVideoGameWatchList = (req, res) => {
  const { id: userId } = req.params;
  const { videoGame } = req.body;

  return User.update({ userId }, { videoGame })
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
  const { id } = req.params;
  const { title } = req.body;

  return User.removeVideoGame(id, title)
    .then((data) => {
      if (data.n === 0) {
        return res
          .status(404)
          .send({ message: 'unable to remove video game from watch list' });
      }

      res.send({
        message: 'successfully removed video game from watch list',
      });
    })
    .catch((err) => {
      const setError = databaseErrorHandling(err);

      res.status(setError.httpStatus).send({ message: setError.description });
    });
};

// process user credentials and validates users input
exports.signIn = (req, res) => {
  const { email: userEmail } = req.body;

  jwt.sign({ userEmail }, secretKey, (err, token) => {
    User.update({ userEmail }, { token })
      .then((userInfo) => {
        const {
          username,
          email,
          city,
          zipcode,
          birthday,
          gender,
          _id: id,
          profilePhoto,
          videoGames,
        } = userInfo;

        res.send({
          message: 'Successfully logged in',
          data: {
            token,
            username,
            email,
            city,
            zipcode,
            birthday,
            gender,
            id,
            profilePhoto,
            videoGames,
          },
        });
      })
      .catch((error) => {
        const setError = databaseErrorHandling(error);

        res.status(setError.httpStatus).send({ message: setError.description });
      });
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
