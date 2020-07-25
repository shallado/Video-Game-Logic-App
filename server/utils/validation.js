const axios = require('axios');
const { accessToken } = require('../config/mapbox');

exports.verifyLocation = (city, zipcode) => {
  const request = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}, ${zipcode}.json?access_token=${accessToken}`;

  return axios
    .get(request)
    .then((response) => {
      const placeType = response.data.features[0].place_type[0];

      // verify to make sure that city and zipcode inputs are valid locations
      if (placeType !== 'postcode') {
        const unVerifiedError = Error();
        unVerifiedError.message = 'Unable to verify city and zipcode';
        unVerifiedError.number = 404;

        throw unVerifiedError;
      }
    })
    .catch((err) => err);
};

exports.validInputs = (data) => {
  // check if it passes schema validations
  if (data.code === 121) {
    return {
      message: 'Document failed validation',
      valid: false,
    };
  }

  // check if its a duplicate email or username value
  if (data.code === 11000) {
    return {
      message: data.message,
      valid: false,
    };
  }

  return { valid: true };
};
