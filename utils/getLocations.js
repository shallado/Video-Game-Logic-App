const axios = require('axios');

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
      url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?proximity=-119.19502000000098,34.21827430202288&limit=6&types=poi&access_token=pk.eyJ1Ijoic2hhbGxhZG8iLCJhIjoiY2p0ZGhiZzBhMDF4bzQzcWZwdmRobXozdCJ9.Y1dfJlKry51bWDXHP1vGmw`,
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

  // return locations.forEach((location, index) => {
  //   axios({
  //     method: 'get',
  //     url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?proximity=-119.19502000000098,34.21827430202288&limit=10&types=poi&access_token=pk.eyJ1Ijoic2hhbGxhZG8iLCJhIjoiY2p0ZGhiZzBhMDF4bzQzcWZwdmRobXozdCJ9.Y1dfJlKry51bWDXHP1vGmw`,
  //   }).then((data) => {
  //     const categoryChecker = [
  //       'grocery, shop',
  //       'it services, it shop, shop',
  //       'department store, department, shop, home appliance',
  //       'video games, leisure',
  //     ];

  //     for (let locationInfo of data.data.features) {
  //       const { category } = locationInfo.properties;

  //       if (categoryChecker.includes(category)) {
  //         locationsInfo.push(locationInfo);
  //       }
  //     }

  //     console.log(index);
  //     if (index === 3) {
  //       return locationsInfo;
  //     }
  //   });
  // });
};

module.exports = getLocations;
