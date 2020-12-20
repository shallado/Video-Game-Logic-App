const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/jwt');
const { User } = require('../models');
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

      res.status(setError.httpStatus).send({
        message: setError.description,
      });
    } else {
      res.status(400).send({
        message: error.msg,
      });
    }

    return;
  }

  const userInfo = req.body;
  const user = new User(userInfo);

  user
    .create()
    .then(() => {
      res.send({
        message: 'successfully signed up',
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

exports.signOut = (req, res) => {
  const { id: userId, token } = req.body;

  User.update({ userId }, { token })
    .then((data) => {
      if (data === null) {
        return res.status(401).send({
          message: 'unable to sign out',
        });
      }

      res.send({
        message: 'successfully signed out',
      });
    })
    .catch((err) => {
      const setError = databaseErrorHandling(err);

      res.status(setError.httpStatus).send({ message: setError.description });
    });
};
