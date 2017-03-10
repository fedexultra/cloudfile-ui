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
var ShimDebug_1 = require("./ShimDebug");
var ShimV1_1 = require("./ShimV1");
var Utilities_1 = require("./Utilities");
// This should only be called once. It detects which version of
// Tableau is running and instantiates the proper version of
// the shim as a global variable.
function createShim() {
    try {
        var environment = cloudFileBridge.GetTableauEnvironment();
        var version = Utilities_1.shimVersion(environment.version);
        if (version === 1) {
            exports.shim = new ShimV1_1.ShimV1();
        }
        else {
            throw new Error('Invalid shim version. Version is ' + version);
        }
    }
    catch (err) {
        // $TODO - We should only instantiate a debug shim in debug and dev builds
        // Otherwise, this should throw an error so if the user tries to access the
        // UI URL directly, we simply display an error message. Define a plugin in
        // webpack to make this possible.
        exports.shim = new ShimDebug_1.ShimDebug();
    }
}
exports.createShim = createShim;
//# sourceMappingURL=Shim.js.map