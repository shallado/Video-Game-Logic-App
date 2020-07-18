/* eslint-disable consistent-return */
const axios = require('axios');
const { User } = require('../models');
const { accessToken } = require('../config/mapbox');

// process user input in order to add user info to database
exports.create = (req, res) => {
  const {
    username,
    password,
    email,
    city,
    zipcode,
    birthday,
    gender,
  } = req.body;

  const request = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}, ${zipcode}.json?access_token=${accessToken}`;

  axios
    .get(request)
    .then((response) => {
      const placeType = response.data.features[0].place_type[0];

      // verify to make sure that city and zipcode inputs are valid locations
      if (placeType !== 'postcode') {
        return res.status(404).send('Unable to verify city and zipcode');
      }

      const user = new User(
        username,
        password,
        email,
        city,
        zipcode,
        birthday,
        gender
      );

      user
        .create()
        .then((data) => {
          // check if it passes schema validations
          if (data.code === 121) {
            return res.status(400).send({
              message: 'Document failed validation',
            });
          }

          // check if its a duplicate email or username value
          if (data.code === 11000) {
            return res.status(400).send({ message: data.message });
          }

          res.send({
            message: 'Successfully added user',
            data: data.ops,
          });
        })
        .catch((err) =>
          res.status(500).send({
            message: err.message,
            error: err.stack,
          })
        );
    })
    .catch((err) =>
      res.status(500).send({
        message: err.message,
        error: err.stack,
      })
    );
};
