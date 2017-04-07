/**
 * This is your package configuration file. Files under "scripts" directory will consume this. If you would like to customize
 * a part of the build that you cannot customize from here, please talk to the Viz Client Infrastructure
 * team before reaching into the "scripts" directory. It is probably better to add the customization to this file.
 */

const path = require('path');

const packageConfig = {
  globalVarName: 'CloudFileConnector',
  moduleName: 'cloud-file-connector',
  globalLibraryDependencies: [
    // Add one entry for every module dependency that you don't want included in the output bundle

  ]
};

module.exports = packageConfig;
