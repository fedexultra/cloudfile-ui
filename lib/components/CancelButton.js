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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var shared_widgets_1 = require("shared-widgets");
var Localize_1 = require("../codegen/Localize");
var Shim_1 = require("../shim/Shim");
var CancelButton = (function (_super) {
    __extends(CancelButton, _super);
    function CancelButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CancelButton.prototype.render = function () {
        var buttonProps = {
            buttonType: shared_widgets_1.ButtonType.Outline,
            handleClick: function () { Shim_1.shim.cancel(); },
            label: Localize_1.Messages.cancel(),
            testId: 'cancel'
        };
        return (React.createElement(shared_widgets_1.ButtonWidget, __assign({}, buttonProps)));
    };
    return CancelButton;
}(React.Component));
exports.CancelButton = CancelButton;
//# sourceMappingURL=CancelButton.js.map