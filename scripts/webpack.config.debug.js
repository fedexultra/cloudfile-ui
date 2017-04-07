/**
 * webpack config for the debug bundle
 */
const path = require('path');
const mergeConfig = require('./merge-config');
const baseWebpackConfig = require('./webpack.config.base.js');
const packageConfig = require('../package.config.js');

const debugConfig = mergeConfig(baseWebpackConfig, {
  entry: `../lib/${packageConfig.globalVarName}.js`,
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'source-map-loader'
      }
    ]
  },
  output: {
    path: path.resolve(__dirname , '../dist'),
    publicPath: '/dist/',
    filename: `${packageConfig.moduleName}.js`,
    libraryTarget: 'umd',
    library: packageConfig.globalVarName
  },
  // Don't trust the documentation for how to handle externals. It's flat out wrong. If you have to edit this,
  // read through the source to figure out how to use it.
  externals: packageConfig.globalLibraryDependencies.reduce(
    (memo, dependency) => {
      memo[dependency.moduleName] = {
        'root': dependency.globalVarName,
        'amd': dependency.moduleName,
        'commonjs': dependency.moduleName,
        'commonjs2': dependency.moduleName,
      }
      return memo;
    },
    {}
  )
});
module.exports = debugConfig;