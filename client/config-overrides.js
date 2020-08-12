const { alias } = require('react-app-rewire-alias');
const npm_package = require('./package.json');

const override = (config) => {
  alias({ ...npm_package._moduleAliases })(config);

  return config;
};

module.exports = override;
