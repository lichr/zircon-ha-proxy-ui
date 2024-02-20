const path = require('path');
const config = require('./webpack.config');

const dist = path.resolve(__dirname, './dist/dev');

config.mode = 'development';
config.output.path = dist;
config.devtool = 'source-map';
config.devServer = {
  static: [
    {
      directory: path.join(__dirname, 'static')
    },
    {
      directory: path.join(__dirname, 'assets/page.json'),
      publicPath: '/page.json'
    }
  ],
  host: '0.0.0.0',
  port: 3007,
  https: false,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
  }
}
module.exports = config;
