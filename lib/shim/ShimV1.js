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
var ShimV1 = (function () {
    function ShimV1() {
    }
    ShimV1.prototype.cancel = function () {
        cloudFileBridge.Cancel();
    };
    ShimV1.prototype.connect = function (file, request) {
        cloudFileBridge.Connect(file, request);
    };
    ShimV1.prototype.getAuthInfo = function () {
        return cloudFileBridge.GetAuthInfo();
    };
    ShimV1.prototype.getCloudProvider = function () {
        var provider = cloudFileBridge.GetCloudProvider();
        if (provider === 'box') {
            return ShimTypes_1.Provider.box;
        }
        else if (provider === 'dropbox') {
            return ShimTypes_1.Provider.dropbox;
        }
        else if (provider === 'onedrive') {
            return ShimTypes_1.Provider.oneDrive;
        }
        return ShimTypes_1.Provider.Invalid;
    };
    ShimV1.prototype.getConnectedFile = function () {
        return cloudFileBridge.GetConnectedFile();
    };
    ShimV1.prototype.getTableauEnvironment = function () {
        return cloudFileBridge.GetTableauEnvironment();
    };
    ShimV1.prototype.log = function (message, severity) {
        cloudFileBridge.Log(message.message, ShimTypes_1.Severity[severity]);
    };
    ShimV1.prototype.refreshAuth = function () {
        return cloudFileBridge.RefreshAuth();
    };
    ShimV1.prototype.reportError = function (error) {
        cloudFileBridge.ReportError(error);
    };
    ShimV1.prototype.signOut = function () {
        cloudFileBridge.SignOut();
    };
    return ShimV1;
}());
exports.ShimV1 = ShimV1;
//# sourceMappingURL=ShimV1.js.map