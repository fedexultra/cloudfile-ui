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
var BoxRequestor_1 = require("./BoxRequestor");
var DropboxRequestor_1 = require("./DropboxRequestor");
var OneDriveRequestor_1 = require("./OneDriveRequestor");
var ShimTypes_1 = require("../types/ShimTypes");
var Shim_1 = require("../shim/Shim");
var RequestorFactory = (function () {
    function RequestorFactory() {
    }
    RequestorFactory.getRequestor = function (provider, providerInfo) {
        var authInfo = Shim_1.shim.getAuthInfo();
        if (provider === ShimTypes_1.Provider.box) {
            return new BoxRequestor_1.BoxRequestor(authInfo, providerInfo);
        }
        else if (provider === ShimTypes_1.Provider.dropbox) {
            return new DropboxRequestor_1.DropboxRequestor(authInfo, providerInfo);
        }
        else if (provider === ShimTypes_1.Provider.oneDrive) {
            return new OneDriveRequestor_1.OneDriveRequestor(authInfo, providerInfo);
        }
        else {
            throw new Error('Invalid provider: ' + provider.toString());
        }
    };
    return RequestorFactory;
}());
exports.RequestorFactory = RequestorFactory;
//# sourceMappingURL=RequestorFactory.js.map