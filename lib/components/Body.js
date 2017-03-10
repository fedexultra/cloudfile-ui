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
var BodyRow_1 = require("./BodyRow");
var CloudItemTypes_1 = require("../types/CloudItemTypes");
;
var Body = (function (_super) {
    __extends(Body, _super);
    function Body(props) {
        var _this = _super.call(this, props) || this;
        _this.onFolderOpened = _this.onFolderOpened.bind(_this);
        _this.onRowSelected = _this.onRowSelected.bind(_this);
        _this.state = { highlightRow: _this.props.rows[0] };
        return _this;
    }
    Body.prototype.onFolderOpened = function (rowId) {
        if (this.props.rows[rowId].cloudItem.type === CloudItemTypes_1.CloudItemType.Folder) {
            this.props.onFolderOpened(this.props.rows[rowId].cloudItem);
        }
        this.setState({ highlightRow: this.props.rows[rowId] });
    };
    Body.prototype.onRowSelected = function (rowId) {
        if (!this.props.rows[rowId].cloudItem.canBeSelected) {
            return;
        }
        this.props.onItemSelected(this.props.rows[rowId].cloudItem);
        this.setState({ highlightRow: this.props.rows[rowId] });
    };
    Body.prototype.render = function () {
        var _this = this;
        var bodyRows = this.props.rows.map(function (row, i) {
            return React.createElement(BodyRow_1.BodyRow, { onConnect: _this.props.onConnect, onFolderOpened: _this.onFolderOpened, onRowSelected: _this.onRowSelected, row: row, key: i, rowId: i, currentHighlightedRow: _this.state.highlightRow });
        });
        return React.createElement("div", null, bodyRows);
    };
    return Body;
}(React.Component));
exports.Body = Body;
//# sourceMappingURL=Body.js.map