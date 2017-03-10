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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ProviderInfo_1 = require("./ProviderInfo");
var Box = (function (_super) {
    __extends(Box, _super);
    function Box() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultFolder = '0';
        _this.providerName = 'Box';
        return _this;
    }
    Box.prototype.constructDownloadRequest = function (item, requestor) {
        var headers = {};
        var request = { 'downloadURL': requestor.getDownloadUrl(item.id),
            'downloadHeaders': headers };
        return request;
    };
    Box.prototype.getDefaultFolder = function () {
        return this.defaultFolder;
    };
    Box.prototype.getProviderName = function () {
        return this.providerName;
    };
    return Box;
}(ProviderInfo_1.ProviderInfo));
exports.Box = Box;
//# sourceMappingURL=Box.js.map