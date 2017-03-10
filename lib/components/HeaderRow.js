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
var Icons_1 = require("../icons/Icons");
var CloudFileColumns_1 = require("../constants/CloudFileColumns");
var HeaderCell_1 = require("./HeaderCell");
var TableStyles_1 = require("../styles/TableStyles");
var SortOrderTypes_1 = require("../types/SortOrderTypes");
;
var HeaderRow = (function (_super) {
    __extends(HeaderRow, _super);
    function HeaderRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HeaderRow.prototype.render = function () {
        var _this = this;
        var columns = CloudFileColumns_1.getCloudFileColumns().map(function (column, i) {
            if (column.id === _this.props.sortableColumnId) {
                return React.createElement(HeaderCell_1.HeaderCell, { column: column, icon: _this.props.sortOrder === SortOrderTypes_1.SortOrder.ascending ? Icons_1.ArrowUpIcon : Icons_1.ArrowDownIcon, onColumnSelected: _this.props.onColumnSelected, key: i });
            }
            return React.createElement(HeaderCell_1.HeaderCell, { column: column, onColumnSelected: _this.props.onColumnSelected, key: i });
        });
        return (React.createElement("div", { style: TableStyles_1.headerRowStyle }, columns));
    };
    return HeaderRow;
}(React.Component));
exports.HeaderRow = HeaderRow;
//# sourceMappingURL=HeaderRow.js.map