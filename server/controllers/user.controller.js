/* eslint-disable consistent-return */
const { User } = require('../models');
const validation = require('../utilis/validation');

// process user input in order to add user info to database
exports.create = (req, res) => {
  const userInfo = req.body;
  validation
    .verifyLocation(userInfo)
    .then((data) => {
      const err = data;

      if (err) {
        throw err;
      }

      const user = new User(userInfo);

      return user.create();
    })
    .then((data) => {
      const isValid = validation.validInputs(data);

      if (!isValid.valid) {
        return res.status(400).send(isValid.message);
      }

      res.send({
        message: 'Successfully added user',
        data: data.ops,
      });
    })
    .catch((err) => {
      if (err.number === 404) {
        return res.status(404).send(err.stack);
      }

      res.status(500).send(err.stack);
    });
};

exports.updateOne = (req, res) => {
  const { id: userId } = req.params;
  const updates = req.body;

  validation
    .verifyLocation(updates)
    .then((data) => {
      const err = data;

      if (err) {
        throw err;
      }

      return User.update(userId, updates);
    })
    .then((data) => {
      const isValid = validation.validInputs(data);

      if (data.nModified === 0) {
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
        return res.status(404).send(err.stack);
      }

      res.status(500).send(err.stack);
    });
};
