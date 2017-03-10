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
var shared_widgets_1 = require("shared-widgets");
var TableStyles_1 = require("../styles/TableStyles");
var IconStyles_1 = require("../styles/IconStyles");
var Icon_1 = require("../components/Icon");
var Colors = shared_widgets_1.TabStyles.Colors, Sizing = shared_widgets_1.TabStyles.Sizing;
;
var HeaderCell = (function (_super) {
    __extends(HeaderCell, _super);
    function HeaderCell(props) {
        var _this = _super.call(this, props) || this;
        _this.onClick = _this.onClick.bind(_this);
        return _this;
    }
    HeaderCell.prototype.onClick = function () {
        this.props.onColumnSelected(this.props.column.id);
    };
    HeaderCell.prototype.render = function () {
        var perCellStyle = shared_widgets_1.assign({}, TableStyles_1.cellStyle, {
            borderLeft: this.props.column.hasBorder ? (Sizing && Sizing.BorderWidth) + "px solid" : 0,
            borderRight: this.props.column.hasBorder ? (Sizing && Sizing.BorderWidth) + "px solid" : 0,
            borderLeftColor: Colors && Colors.L2,
            borderRightColor: Colors && Colors.L2,
            width: this.props.column.width,
        });
        return (React.createElement("span", { onClick: this.onClick, style: perCellStyle },
            this.props.column.title,
            this.props.icon ? React.createElement(Icon_1.Icon, { source: this.props.icon.source, style: IconStyles_1.ColumnSortIconStyle }) : undefined));
    };
    return HeaderCell;
}(React.Component));
exports.HeaderCell = HeaderCell;
//# sourceMappingURL=HeaderCell.js.map