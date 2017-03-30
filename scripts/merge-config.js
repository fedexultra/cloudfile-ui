const _ = require('lodash')

/**
 * Merges the source config into the target config. If an array is encountered, it will concatenate the arrays
 */
const mergeConfig = function(target, source) {
  return _.mergeWith(target, source, (objValue, srcValue) => {
    if (_.isArray(objValue)) {
      return objValue.concat(srcValue);
    }
  });
}

module.exports = mergeConfig;