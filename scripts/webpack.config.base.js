/**
 * The base webpack config. Only include the required config for all targets
 */
const webpack = require('webpack');
const process = require('process');
const path = require('path');
const _ = require('lodash');
const packageConfig = require('../package.config.js');

const baseConfig = {
  context: path.resolve(__dirname),

  // source map compilation is slow. If they get too slow in the dev build,
  // consider using cheaper source map options or not using them at all
  devtool: 'source-map',
  progress: true,
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js']
  },

  // $TODO: Find another approach to polyfill the global environment for whatwg-fetch
  // According to Matt York this way will be problematic for future integration with web authoring
  plugins: [
    new webpack.ProvidePlugin({
      'Promise': 'es6-promise'
    })
  ]
};

module.exports = baseConfig;
