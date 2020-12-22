const bcrypt = require('bcrypt');
const databaseErrorHandling = require('../utils/databaseErrorHandling');

// hashes user created passwords
const hashPassword = (req, res, next) => {
  const saltRounds = 12;

  const password = req.body.newPassword
    ? req.body.newPassword
    : req.body.password;

  bcrypt
    .hash(password, saltRounds)
    .then((hash) => {
      if (req.body.newPassword) {
        req.body.newPassword = hash;
      } else {
        req.body.password = hash;
      }

      next();
    })
    .catch((err) => {
      const setError = databaseErrorHandling(err);

      res.status(setError.httpStatus).send({ message: setError.description });
    });
};

module.exports = {
  hashPassword,
};
