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
var React = require("react");
var TextStyles_1 = require("../styles/TextStyles");
var ErrorStyles_1 = require("../styles/ErrorStyles");
;
var ErrorWidget = (function (_super) {
    __extends(ErrorWidget, _super);
    function ErrorWidget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErrorWidget.prototype.render = function () {
        var errorWidgetId = 'error_widget';
        return (React.createElement("div", { style: ErrorStyles_1.ErrorStyle },
            React.createElement("span", { style: TextStyles_1.errorMessageStyle, "data-tb-test-id": errorWidgetId }, this.props.errorMessage)));
    };
    ;
    return ErrorWidget;
}(React.Component));
exports.ErrorWidget = ErrorWidget;
//# sourceMappingURL=ErrorWidget.js.map