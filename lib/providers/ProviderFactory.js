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
var Box_1 = require("./Box");
var Dropbox_1 = require("./Dropbox");
var OneDrive_1 = require("./OneDrive");
var ShimTypes_1 = require("../types/ShimTypes");
var ProviderInfoFactory = (function () {
    function ProviderInfoFactory() {
    }
    ProviderInfoFactory.getProviderInfo = function (provider) {
        if (provider === ShimTypes_1.Provider.box) {
            return new Box_1.Box();
        }
        else if (provider === ShimTypes_1.Provider.dropbox) {
            return new Dropbox_1.Dropbox();
        }
        else if (provider === ShimTypes_1.Provider.oneDrive) {
            return new OneDrive_1.OneDrive();
        }
        else {
            throw new Error('Invalid provider: ' + provider.toString());
        }
    };
    return ProviderInfoFactory;
}());
exports.ProviderInfoFactory = ProviderInfoFactory;
//# sourceMappingURL=ProviderFactory.js.map