const httpStatusCodes = require('./statusCodes');

// handles all error outputs messages
const userErrorHandling = (err) => {
  const formField = err.keyValue && Object.keys(err.keyValue);
  let setError;

  if (err.code === 11000) {
    setError = {
      httpStatus: httpStatusCodes.BAD_REQUEST,
      description: `${formField} is already taken`,
    };
  } else if (err.code === 121) {
    setError = {
      httpStatus: httpStatusCodes.BAD_REQUEST,
      description: `document failed validation`,
    };
  } else if (err.httpStatus === 400) {
    setError = err;
  } else if (err.msg === '400') {
    setError = {
      httpStatus: httpStatusCodes.UNAUTHORIZED,
      description: 'unable to verify city and zipcode',
    };
  } else if (err.httpStatus === 401) {
    setError = err;
  } else if (err.httpStatus === 404) {
    setError = err;
  } else if (err.number === 404) {
    setError = {
      httpStatus: err.number,
      description: err.message,
    };
  } else {
    setError = {
      httpStatus: httpStatusCodes.INTERNAL_SERVER,
      description: err.message,
    };
  }

  return setError;
};

module.exports = userErrorHandling;
