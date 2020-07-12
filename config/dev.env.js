const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"production"',
  BASE_URL: '"//192.168.31.107:7001"',
});
