/**
 * webpack config for the release bundle
 */
const webpack = require('webpack');
const mergeConfig = require('./merge-config');
const debugWebpackConfig = require('./webpack.config.debug.js');
const packageConfig = require('../package.config.js');

module.exports = mergeConfig(debugWebpackConfig, {
  output: {
    filename: `${packageConfig.moduleName}.min.js`
  },
  plugins: [
    // TODO: standardize on a debug code strategy
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }),

    // TODO: standardize on uglify options
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ]
});