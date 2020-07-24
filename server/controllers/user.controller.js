/* eslint-disable consistent-return */
const { User } = require('../models');
const validation = require('../utilis/validation');

// process user input in order to add user info to database
exports.create = (req, res) => {
  const userInfo = req.body;
  const user = new User(userInfo);

  user
    .create()
    .then((data) => {
      const isValid = validation.validInputs(data);

      if (data.number === 404) {
        const error = data;

        throw error;
      }

      if (!isValid.valid) {
        throw Error(isValid.message);
      }

      res.send({
        message: 'Successfully added user',
        data: data.ops,
      });
    })
    .catch((err) => {
      if (err.number === 404) {
        return res.status(404).send(err.message);
      }

      res.status(500).send(err.stack);
    });
};

// updates user info that is stored in the database
exports.updateOne = (req, res) => {
  const { id: userId } = req.params;
  const updates = req.body;

  return User.update(userId, updates)
    .then((data) => {
      const isValid = validation.validInputs(data);

      if (data.number === 404) {
        const error = data;

        throw error;
      }

      if (data.n === 0) {
        return res.status(404).send({
          message: 'Unable to find user to update try again',
        });
      }

      if (!isValid.valid) {
        return res.status(400).send(isValid.message);
      }

      res.send({
        message: 'Successfully updated user info',
        data,
      });
    })
    .catch((err) => {
      if (err.number === 404) {
        return res.status(404).send(err.message);
      }

      res.status(500).send(err.stack);
    });
};

// process user credentials and validates users input
exports.signIn = (req, res) => {
  const { email, password } = req.body;

  User.isPasswordValid(email, password)
    .then((data) => {
      if (data.number === 401) {
        const error = data;

        throw error;
      }

      if (!data) {
        return res.status(404).send({
          message: 'Unable to find user try again',
        });
      }

      res.send(data);
    })
    .catch((err) => {
      if (err.number === 401) {
        return res.status(401).send(err.message);
      }

      res.status(500).send(err.stack);
    });
};

// processes user uploaded photo to be stored into the database
exports.uploadProfilePhoto = (req, res) => {
  const { id } = req.params;

  User.upload(id, req.file)
    .then((data) => {
      if (data.n === 0) {
        return res.status(404).send({
          message: 'Unable to find user',
        });
      }

      res.json({
        message: 'Successfully uploaded user profile photo',
        data,
      });
    })
    .catch((err) => res.status(500).json(err.stack));
};
