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
var BreadcrumbStyles = require("../styles/BreadcrumbStyles");
var CloudItemTypes_1 = require("../types/CloudItemTypes");
var shared_widgets_1 = require("shared-widgets");
;
var BreadcrumbItem = (function (_super) {
    __extends(BreadcrumbItem, _super);
    function BreadcrumbItem(props) {
        var _this = _super.call(this, props) || this;
        _this.handleClick = _this.handleClick.bind(_this);
        return _this;
    }
    BreadcrumbItem.prototype.handleClick = function () {
        this.props.onItemSelected(this.props.item);
    };
    BreadcrumbItem.prototype.render = function () {
        var itemName = this.props.item.name;
        var interactiveDomProps = {
            interactiveStyles: {
                hover: BreadcrumbStyles.HoverFolderStyle
            },
            pointerClick: this.handleClick
        };
        if (this.props.item.type === CloudItemTypes_1.CloudItemType.Folder) {
            return (React.createElement("span", { style: BreadcrumbStyles.BreadcrumbStyle },
                React.createElement(shared_widgets_1.InteractiveDomWrapper, __assign({}, interactiveDomProps),
                    React.createElement("span", { style: BreadcrumbStyles.ElidedFolderStyle }, itemName)),
                this.props.displayArrow ? React.createElement("span", { style: BreadcrumbStyles.BreadcrumbTextStyle },
                    " ",
                    ' > ',
                    " ") : undefined));
        }
        else {
            return (React.createElement("span", null,
                React.createElement("span", { style: BreadcrumbStyles.BreadcrumbElidedTextStyle }, itemName),
                this.props.displayArrow ? React.createElement("span", { style: BreadcrumbStyles.BreadcrumbTextStyle },
                    " ",
                    ' > ',
                    " ") : undefined));
        }
    };
    return BreadcrumbItem;
}(React.Component));
exports.BreadcrumbItem = BreadcrumbItem;
//# sourceMappingURL=BreadcrumbItem.js.map