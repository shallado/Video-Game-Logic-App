const getLocations = require('../utils/getLocations');

exports.getPointsOfInterest = (req, res) => {
  getLocations()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => res.status(500).send(err));
};
