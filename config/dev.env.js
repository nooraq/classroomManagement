const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"production"',
  BASE_URL: '"//127.0.0.1:7001"',
});
