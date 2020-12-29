const axios = require('axios');
const { apiKey } = require('../config/mapbox');

const getLocations = () => {
  const locations = ['Walmart', 'Best Buy', 'Target', 'Gamestop'];
  const categoryChecker = [
    'grocery, shop',
    'it services, it shop, shop',
    'department store, department, shop, home appliance',
    'video games, leisure',
  ];
  const places = [];
  const requests = [];

  locations.forEach((location) => {
    requests.push({
      method: 'get',
      url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?proximity=-119.19502000000098,34.21827430202288&limit=6&types=poi&access_token=${apiKey}`,
    });
  });

  return axios
    .all([
      axios(requests[0]),
      axios(requests[1]),
      axios(requests[2]),
      axios(requests[3]),
    ])
    .then(
      axios.spread((data1, data2, data3, data4) => {
        const locationsInfo = [
          data1.data.features,
          data2.data.features,
          data3.data.features,
          data4.data.features,
        ];

        locationsInfo.forEach((locationInfo) => {
          locationInfo.forEach((info) => {
            const { category } = info.properties;

            if (categoryChecker.includes(category)) {
              places.push(info);
            }
          });
        });

        return places;
      })
    );
};

module.exports = getLocations;
