/**
 * Node script to run the build in development mode. Will do an incremental build and refresh the browser on every file save
 */

const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const devWebpackConfig = require('./webpack.config.dev.js')
const _ = require('lodash');
const open = require('open');
const server = new WebpackDevServer(webpack(devWebpackConfig), {
  publicPath: devWebpackConfig.output.publicPath,
  stats: {
    // Customize the output to be minimal
    colors: true,
    hash: false,
    timings: true,
    assets: false,
    chunks: false,
    chunkModules: false,
    modules: true,
    children: false,
    version: false,
    cached: false,
    cachedAssets: false,
    reasons: false,
    source: false,
    errorDetails: false
  }
});

server.listen(8081, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
  }
  open('http://localhost:8081/index-dev.html');
});
