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
var TableStyles_1 = require("../styles/TableStyles");
var IconStyles_1 = require("../styles/IconStyles");
var Icons_1 = require("../icons/Icons");
var TextStyles_1 = require("../styles/TextStyles");
var Icon_1 = require("../components/Icon");
var shared_widgets_2 = require("shared-widgets");
var Colors = shared_widgets_1.TabStyles.Colors, Sizing = shared_widgets_1.TabStyles.Sizing;
;
var BodyCell = (function (_super) {
    __extends(BodyCell, _super);
    function BodyCell(props) {
        var _this = _super.call(this, props) || this;
        _this.handleClick = _this.handleClick.bind(_this);
        return _this;
    }
    BodyCell.prototype.getValue = function () {
        if (this.props.icon === Icons_1.FolderIcon) {
            // We do not set the pointer prop to call handleClick in InteractiveDomProps because the shared-widgets
            // library uses an older version of react that does not have generic types whereas our project has a
            // later version with generic types. When the shared-widgets library changes from typings to @types/react
            // (TFSID 613276), we should move the handleClick function back to InteractiveDomProps
            var interactiveDomProps = {
                interactiveStyles: {
                    hover: TextStyles_1.hoverStyle
                },
            };
            return (React.createElement(shared_widgets_2.InteractiveDomWrapper, __assign({}, interactiveDomProps),
                React.createElement("span", { className: 'data-grid-body-cell-value', onClick: this.handleClick, "data-tb-test-id": this.props.testValueUniqueCellId }, this.props.value)));
        }
        else {
            return React.createElement("span", { className: 'data-grid-body-cell-value', "data-tb-test-id": this.props.testValueUniqueCellId }, this.props.value);
        }
    };
    BodyCell.prototype.handleClick = function (event) {
        event.stopPropagation();
        this.props.handleFolderTextClicked();
    };
    BodyCell.prototype.render = function () {
        var perCellStyle = shared_widgets_1.assign({}, TableStyles_1.cellStyle, {
            width: this.props.width,
            borderLeft: this.props.hasBorder ? (Sizing && Sizing.BorderWidth) + "px solid" : 0,
            borderRight: this.props.hasBorder ? (Sizing && Sizing.BorderWidth) + "px solid" : 0,
            borderLeftColor: Colors && Colors.L2,
            borderRightColor: Colors && Colors.L2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            verticalAlign: 'middle'
        });
        return (React.createElement("div", { className: 'data-grid-body-cell', style: perCellStyle },
            React.createElement(Icon_1.Icon, { source: this.props.icon.source, style: IconStyles_1.DataGridRowIconStyle }),
            this.getValue()));
    };
    return BodyCell;
}(React.Component));
exports.BodyCell = BodyCell;
//# sourceMappingURL=BodyCell.js.map