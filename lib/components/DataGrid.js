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
var Body_1 = require("./Body");
var HeaderRow_1 = require("./HeaderRow");
var SpaceStyles_1 = require("../styles/SpaceStyles");
var TableStyles_1 = require("../styles/TableStyles");
;
var DataGrid = (function (_super) {
    __extends(DataGrid, _super);
    function DataGrid() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DataGrid.prototype.render = function () {
        return (React.createElement("div", { style: SpaceStyles_1.SpaceStyle },
            React.createElement(HeaderRow_1.HeaderRow, { onColumnSelected: this.props.onColumnSelected, sortableColumnId: this.props.sortableColumnId, sortOrder: this.props.sortOrder }),
            React.createElement("div", { style: TableStyles_1.tableStyle },
                React.createElement(Body_1.Body, { rows: this.props.rows, onItemSelected: this.props.onItemSelected, onFolderOpened: this.props.onFolderOpened, onConnect: this.props.onConnect }))));
    };
    return DataGrid;
}(React.Component));
exports.DataGrid = DataGrid;
//# sourceMappingURL=DataGrid.js.map