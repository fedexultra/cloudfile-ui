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
var BodyCell_1 = require("./BodyCell");
var CloudItemTypes_1 = require("../types/CloudItemTypes");
var CloudFileColumns_1 = require("../constants/CloudFileColumns");
var TableStyles_1 = require("../styles/TableStyles");
var TestUtilities_1 = require("../utils/TestUtilities");
;
var BodyRow = (function (_super) {
    __extends(BodyRow, _super);
    function BodyRow(props) {
        var _this = _super.call(this, props) || this;
        _this.handleKeyDown = _this.handleKeyDown.bind(_this);
        _this.handleRowOpened = _this.handleRowOpened.bind(_this);
        _this.handleRowSelected = _this.handleRowSelected.bind(_this);
        return _this;
    }
    BodyRow.prototype.getRenderedStyle = function () {
        if (this.props.row === this.props.currentHighlightedRow) {
            return TableStyles_1.rowHighlightStyle;
        }
        else {
            var styleToApply = this.props.rowId % 2 === 1 ? TableStyles_1.rowStyle : TableStyles_1.stripedRowStyle;
            if (!this.props.row.cloudItem.displayAsEnabled) {
                return shared_widgets_1.assign({}, styleToApply, TableStyles_1.rowUnsupportedFileTypeStyle);
            }
            else {
                return styleToApply;
            }
        }
    };
    BodyRow.prototype.handleKeyDown = function (event) {
        if (event.key === 'Enter') {
            if (this.props.row === this.props.currentHighlightedRow && this.props.row.cloudItem.type === CloudItemTypes_1.CloudItemType.File) {
                this.props.onConnect();
            }
            else if (this.props.row === this.props.currentHighlightedRow && this.props.row.cloudItem.type === CloudItemTypes_1.CloudItemType.Folder) {
                this.props.onFolderOpened(this.props.rowId);
            }
        }
    };
    BodyRow.prototype.handleRowOpened = function () {
        if (this.props.row.cloudItem.type === CloudItemTypes_1.CloudItemType.File && this.props.row.cloudItem.canBeSelected) {
            this.props.onConnect();
        }
        else if (this.props.row.cloudItem.type === CloudItemTypes_1.CloudItemType.Folder) {
            this.props.onFolderOpened(this.props.rowId);
        }
    };
    BodyRow.prototype.handleRowSelected = function () {
        this.props.onRowSelected(this.props.rowId);
    };
    BodyRow.prototype.render = function () {
        var _this = this;
        var pointerEventProps = {
            pointerClick: this.handleRowSelected,
            pointerDoubleClick: this.handleRowOpened
        };
        var cells = CloudFileColumns_1.getCloudFileColumns().map(function (column, i) {
            return React.createElement(BodyCell_1.BodyCell, { value: column.getCellFromRow(_this.props.row), width: column.width, hasBorder: column.hasBorder, icon: column.getIconFromRow(_this.props.row), handleFolderTextClicked: _this.handleRowOpened, 
                // This value is used to uniquely identify cells, which helps with automation.
                testValueUniqueCellId: TestUtilities_1.getUniqueCellId(_this.props.rowId, i), key: i });
        });
        var renderedStyle = this.getRenderedStyle();
        return (React.createElement(shared_widgets_1.PointerEventWrapper, __assign({}, pointerEventProps),
            React.createElement("div", { onKeyDown: this.handleKeyDown, style: renderedStyle, tabIndex: 0 }, cells)));
    };
    return BodyRow;
}(React.Component));
exports.BodyRow = BodyRow;
//# sourceMappingURL=BodyRow.js.map