const axios = require('axios');

const locationValidator = (values) => {
  const { city, zipcode } = values;

  const request = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}, ${zipcode}.json?access_token=${process.env.REACT_APP_MAP_BOX_ACCESS_TOKEN}`;

  return axios.get(request).then((response) => {
    const placeType = response.data.features[0].place_type[0];
    // verify to make sure that city and zipcode inputs are valid locations
    if (placeType !== 'postcode') {
      return 'Unable to verify city and zipcode';
    }
  });
};

module.exports = locationValidator;
