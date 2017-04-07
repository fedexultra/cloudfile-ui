const webpack = require('webpack');
const packageConfig = require('../package.config.js');
const karmaBaseConfig = require('./karma.config.base.js');
const mergeConfig = require('./merge-config');

const karmaConfigFunction = function (config) {
  const karmaConfig = mergeConfig(karmaBaseConfig, {

    // keep this as 'dots' to ensure accurate reporting during tube build
    reporters: ['mocha', 'kjhtml'],

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_WARN,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    browsers: ['Chrome'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
  config.set(karmaConfig)
}

module.exports = karmaConfigFunction;