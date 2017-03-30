const webpack = require('webpack');
const packageConfig = require('../package.config.js');
const webpackBaseConfig = require('./webpack.config.base.js');

const karmaBaseConfig = {

  // base path that will be used to resolve all patterns (eg. files, exclude)
  basePath: '',

  // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
  frameworks: ['jasmine'],


  // list of files / patterns to load in the browser
  files: [
    '../dist/compiled-locales/messages.en_US.js',
    '../dist/compiled-locales/formatters-and-parsers.en_US.js',
    './test-index.js'
  ],

  // list of files to exclude
  exclude: [],

  // preprocess matching files before serving them to the browser
  // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
  preprocessors: {
    './test-index.js': ['webpack']
  },
  webpackMiddleware: {
    noInfo: true
  },

  webpack: {
    resolve: {
      // Add `.ts` and `.tsx` as a resolvable extension.
      extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
      root: webpackBaseConfig.resolve.root
    },
    module: {

      loaders: [
        // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /\/node_modules\//,
          query: {
            presets: ['airbnb']
          }
        }
      ]
    },
    externals: {
      'jasmine': 'jasmine',
      'cheerio': 'window',
      'react/addons': true,
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': true
    },
    plugins: [
      // This is needed to teach webpack how to process typescript files
      new webpack.SourceMapDevToolPlugin({
        test: /\.(tsx?|js)($|\?)/i // process .js and .ts and .tsx files only
      }),
      new webpack.NoErrorsPlugin() // Don't run tests if there's a compilation error
    ]
  },

  // web server port
  port: 9876,

  // enable / disable colors in the output (reporters and logs)
  colors: true,

  // Concurrency level
  // how many browser should be started simultanous
  concurrency: Infinity,
}

module.exports = karmaBaseConfig;