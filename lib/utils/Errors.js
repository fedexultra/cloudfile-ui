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
var CloudItemNotFoundError = (function (_super) {
    __extends(CloudItemNotFoundError, _super);
    function CloudItemNotFoundError(message) {
        if (message === void 0) { message = ''; }
        return _super.call(this, message) || this;
    }
    return CloudItemNotFoundError;
}(Error));
exports.CloudItemNotFoundError = CloudItemNotFoundError;
;
//# sourceMappingURL=Errors.js.map