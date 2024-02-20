const path = require('path');
const config = require('./webpack.config');

const dist = path.resolve(__dirname, './dist/prod');

config.mode = 'production';
config.output.path = dist;

module.exports = config;
