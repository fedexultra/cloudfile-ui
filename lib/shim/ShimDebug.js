// -----------------------------------------------------------------------------
//
// This file is the copyrighted property of Tableau Software and is protected
// by registered patents and other applicable U.S. and international laws and
// regulations.
//
// Unlicensed use of the contents of this file is prohibited. Please refer to
// the NOTICES.txt file for further details.
//
// -----------------------------------------------------------------------------
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ShimTypes_1 = require("../types/ShimTypes");
var Logger_1 = require("../utils/Logger");
// Basic shim for debugging that is used when this project
// is loaded outside of the Tableau context.
var ShimDebug = (function () {
    function ShimDebug() {
    }
    ShimDebug.prototype.cancel = function () {
        Logger_1.log('Cancel shim method invoked. Ending execution.');
        throw new Error('Program termination requested.');
    };
    ShimDebug.prototype.connect = function (file, request) {
        Logger_1.log('Connect shim method invoked. Ending execution.');
        throw new Error('Program termination requested.');
    };
    ShimDebug.prototype.getAuthInfo = function () {
        Logger_1.log('GetAuthInfo shim method invoked. Returning dummy data.');
        var auth = {
            userId: 'dummy@gmail.com',
            accessToken: '0UQLbIImR4gljBygJcgZT2XBHebz8hqY'
        };
        return auth;
    };
    ShimDebug.prototype.getCloudProvider = function () {
        Logger_1.log('GetCloudProvider shim method invoked. Returning dummy data.');
        return ShimTypes_1.Provider.box;
    };
    ShimDebug.prototype.getConnectedFile = function () {
        Logger_1.log('GetConnectedFile shim method invoked. Returning dummy data.');
        var file = {
            fileName: 'dummy_file.xlsx',
            fileID: 'aj84nfkf9485jnfdnf',
            fileExtension: 'xlsx',
            fileMetadata: { 'folder': 'a/b/dummy_file.xlsx' }
        };
        return file;
    };
    ShimDebug.prototype.getTableauEnvironment = function () {
        Logger_1.log('GetTableauEnvironment shim method invoked. Returning dummy data.');
        var environment = {
            version: '0.0.0',
            edition: 'None',
            locale: 'en_US',
            os: 'win',
            buildNumber: '0.0.0000',
            supportedFileTypes: { 'debug': ['xlsx', 'txt'] },
        };
        return environment;
    };
    ShimDebug.prototype.log = function (message, severity) {
        Logger_1.log('Log shim method invoked.');
        Logger_1.log('Message: ' + message.message);
        Logger_1.log('Severity: ' + ShimTypes_1.Severity[severity]);
    };
    ShimDebug.prototype.refreshAuth = function () {
        Logger_1.log('RefreshAuth shim method invoked. Returning dummy data.');
        return 'EsbePkzKGaDcSwV9UhQmdUIVSDOwJaGu';
    };
    ShimDebug.prototype.reportError = function (error) {
        Logger_1.log('ReportError shim method invoked. Ending execution.');
        throw new Error('Program termination requested.');
    };
    ShimDebug.prototype.signOut = function () {
        Logger_1.log('SignOut shim method invoked. Ending execution.');
        throw new Error('Program termination requested.');
    };
    return ShimDebug;
}());
exports.ShimDebug = ShimDebug;
//# sourceMappingURL=ShimDebug.js.map