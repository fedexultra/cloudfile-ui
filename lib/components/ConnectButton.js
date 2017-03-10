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
var ConnectButton = (function (_super) {
    __extends(ConnectButton, _super);
    function ConnectButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConnectButton.prototype.render = function () {
        var _this = this;
        var buttonProps = {
            buttonType: shared_widgets_1.ButtonType.Go,
            disabled: !this.props.enabled,
            handleClick: function () {
                _this.props.onClick();
            },
            label: Localize_1.Messages.connect(),
            testId: 'connect'
        };
        return (React.createElement(shared_widgets_1.ButtonWidget, __assign({}, buttonProps)));
    };
    return ConnectButton;
}(React.Component));
exports.ConnectButton = ConnectButton;
//# sourceMappingURL=ConnectButton.js.map