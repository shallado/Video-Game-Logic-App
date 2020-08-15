const axios = require('axios');
const { body } = require('express-validator');
const { apiKey } = require('../config/mapbox');

// checks to see if the provided location info city and zipcode are valid
exports.locationCheck = body(['city']).custom((value, { req }) => {
  const city = value;
  const request = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}, ${req.body.zipcode}.json?access_token=${apiKey}`;

  return axios.get(request).then((response) => {
    const placeType = response.data.features[0].place_type[0];
    // verify to make sure that city and zipcode inputs are valid locations
    if (placeType !== 'postcode') {
      throw new Error('400');
    }
  });
});

// checks to make sure that input data are valid data types and follow input guidelines
exports.inputValidation = () => {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
  const inputFields = [
    'username',
    'password',
    'email',
    'city',
    'zipcode',
    'birthday',
    'gender',
  ];
  const validationFields = [];

  for (const i of inputFields) {
    validationFields.push(
      body(i).exists({ checkFalsy: true }).withMessage('required')
    );
  }

  return [
    // username
    validationFields[0]
      .isString()
      .withMessage('value must be a string')
      .isLength({ max: 26 })
      .withMessage('exceeded maximum length of 26'),
    // password
    validationFields[1]
      .matches(regex)
      .withMessage(
        'must be 8 to 15 characters long contain one lowercase letter, one uppercase letter, one numeric digit and one special character'
      ),
    // email
    validationFields[2].isEmail(),
    // city
    validationFields[3].isString().withMessage('value must be a string'),
    // zipcode
    validationFields[4].isPostalCode('any').withMessage('value invalid'),
    // birthday
    validationFields[5].isDate().withMessage('valid invalid'),
    // gender
    validationFields[6].isString().withMessage('value must be a string'),
  ];
};
