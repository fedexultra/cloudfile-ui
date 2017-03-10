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
var Provider;
(function (Provider) {
    Provider[Provider["Invalid"] = 0] = "Invalid";
    Provider[Provider["box"] = 1] = "box";
    Provider[Provider["dropbox"] = 2] = "dropbox";
    Provider[Provider["oneDrive"] = 3] = "oneDrive";
})(Provider || (Provider = {}));
exports.Provider = Provider;
var Severity;
(function (Severity) {
    Severity[Severity["Trace"] = 0] = "Trace";
    Severity[Severity["Debug"] = 1] = "Debug";
    Severity[Severity["Info"] = 2] = "Info";
    Severity[Severity["Warn"] = 3] = "Warn";
    Severity[Severity["Error"] = 4] = "Error";
    Severity[Severity["Fatal"] = 5] = "Fatal";
    Severity[Severity["Off"] = 6] = "Off";
    Severity[Severity["LogDetail"] = 7] = "LogDetail";
})(Severity || (Severity = {}));
exports.Severity = Severity;
//# sourceMappingURL=ShimTypes.js.map