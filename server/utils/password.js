const bcrypt = require('bcrypt');
const APIError = require('./apiError');
const httpStatusCodes = require('./statusCodes');

// hashes user created passwords
const hashPassword = (password) => {
  const saltRounds = 12;
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

  if (!password.match(regex)) {
    // must be 8 to 15 characters long
    // contain one lowercase letter, one uppercase letter, one numeric digit and one special character
    throw new APIError(
      'Bad Request',
      httpStatusCodes.BAD_REQUEST,
      'password does not meet requirements try again'
    );
  } else {
    return bcrypt.hash(password, saltRounds);
  }
};

// compares user password in database and user input password
const comparePassword = (inputPassword, databasePassword, userId) => {
  return bcrypt.compare(inputPassword, databasePassword).then((isValid) => {
    if (!isValid) {
      throw new APIError(
        'Unauthorized',
        httpStatusCodes.UNAUTHORIZED,
        'invalid password'
      );
    }

    return userId;
  });
};

module.exports = {
  hashPassword,
  comparePassword,
};
