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
var ProviderInfo = (function () {
    function ProviderInfo() {
    }
    // Constructs a FileAttrs object to use in a connect shim call
    ProviderInfo.prototype.constructFileAttrs = function (selectedFile) {
        var metadata = { 'folder': selectedFile.path[selectedFile.path.length - 1].id };
        var fileAttrs = { 'fileName': selectedFile.name, 'fileID': selectedFile.id,
            'fileExtension': selectedFile.extension, 'fileMetadata': metadata };
        return fileAttrs;
    };
    return ProviderInfo;
}());
exports.ProviderInfo = ProviderInfo;
//# sourceMappingURL=ProviderInfo.js.map