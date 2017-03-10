"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
var Icons_1 = require("../icons/Icons");
var CloudItemType;
(function (CloudItemType) {
    CloudItemType[CloudItemType["File"] = 0] = "File";
    CloudItemType[CloudItemType["Folder"] = 1] = "Folder";
    CloudItemType[CloudItemType["Unknown"] = 2] = "Unknown";
})(CloudItemType = exports.CloudItemType || (exports.CloudItemType = {}));
var NullCloudItem = (function () {
    function NullCloudItem() {
        this.canBeSelected = false;
        this.displayAsEnabled = false;
        this.displayKind = '';
        this.extension = '';
        this.icon = Icons_1.EmptyIcon;
        this.id = '';
        this.modifiedAt = new Date(0);
        this.name = '';
        this.path = [];
        this.type = CloudItemType.Unknown;
    }
    return NullCloudItem;
}());
exports.NullCloudItem = NullCloudItem;
//# sourceMappingURL=CloudItemTypes.js.map