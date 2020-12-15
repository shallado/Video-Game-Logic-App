const { User } = require('../models');
const databaseErrorHandling = require('../utils/databaseErrorHandling');

exports.signOut = (req, res) => {
  const { id: userId, token } = req.body;

  User.update({ userId }, { token })
    .then((data) => {
      if (data === null) {
        res.status(401).send({
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
