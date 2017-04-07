/**
 * webpack config for active development and testing
 */

const mergeConfig = require('./merge-config');
const baseWebpackConfig = require('./webpack.config.base.js');
const packageConfig = require('../package.config.js');
const path = require('path');

const webpack = require('webpack');

const devConfig = mergeConfig(baseWebpackConfig, {
  // We'll generate two javsacript files: this app, tableau files
  entry: {
    app: '../src/CloudFileConnector.tsx',
    external: packageConfig.globalLibraryDependencies.map(dep => dep.moduleName)
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: `${packageConfig.moduleName}-dev-bundle.js`,
    publicPath: '/dist/',
    library: packageConfig.globalVarName
  },
  module: {
    loaders: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['external'],
      filename: '../dist/[name].js',
      minChunks: Infinity
    })
  ],
  ts: {
    configFileName: '../src/tsconfig.json'
  },
  resolve: {
    extensions: ['.ts', '.tsx']
  }
});

module.exports = devConfig;