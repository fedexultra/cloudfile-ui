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
var shared_widgets_2 = require("shared-widgets");
var Localize_1 = require("../codegen/Localize");
var Shim_1 = require("../shim/Shim");
var TextStyles_1 = require("../styles/TextStyles");
;
var SignedInUserWidget = (function (_super) {
    __extends(SignedInUserWidget, _super);
    function SignedInUserWidget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SignedInUserWidget.prototype.render = function () {
        var interactiveDomProps = {
            interactiveStyles: {
                hover: TextStyles_1.hoverStyle
            },
            pointerClick: function () { return Shim_1.shim.signOut(); }
        };
        var signedInProps = {
            label: Localize_1.Messages.signedInAs({ user: this.props.email }),
            disabled: false,
            testId: 'signed-in-as'
        };
        var signOutLabel = Localize_1.Messages.signOut();
        var signOutId = 'sign_out';
        return (React.createElement("section", { style: TextStyles_1.signedInUserStyle },
            React.createElement(shared_widgets_1.InputLabelWidget, __assign({ style: TextStyles_1.signedInStyle }, signedInProps), signedInProps.label),
            React.createElement(shared_widgets_2.InteractiveDomWrapper, __assign({}, interactiveDomProps),
                React.createElement("span", { style: TextStyles_1.signOutStyle, "data-tb-test-id": signOutId }, signOutLabel))));
    };
    return SignedInUserWidget;
}(React.Component));
exports.SignedInUserWidget = SignedInUserWidget;
//# sourceMappingURL=SignedInUserWidget.js.map