/**
 * This is the entry point for webpack to load every typescript file under ../test
 */

require('es6-promise').polyfill();
var testsContext = require.context('../test', true, /\.tsx?$/);
testsContext.keys().forEach(testsContext);