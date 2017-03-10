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
Object.defineProperty(exports, "__esModule", { value: true });
var shared_widgets_1 = require("shared-widgets");
var Colors = shared_widgets_1.TabStyles.Colors, Sizing = shared_widgets_1.TabStyles.Sizing, Spacing = shared_widgets_1.TabStyles.Spacing, Typography = shared_widgets_1.TabStyles.Typography;
var cellStyle = {
    cursor: 'default',
    display: 'table-cell',
    paddingBottom: 0,
    paddingLeft: Spacing && Spacing.DefaultSpace,
    paddingRight: Spacing && Spacing.DefaultSpace
};
exports.cellStyle = cellStyle;
var rowStyle = {
    borderBottom: (Sizing && Sizing.BorderWidth) + "px solid",
    borderBottomColor: Colors && Colors.L2,
    display: 'table',
    fontSize: Typography && Typography.Sizing && Typography.Sizing.Small,
    fontFamily: Typography && Typography.FontFamily,
    height: Sizing && Sizing.RowHeight,
    lineHeight: (Sizing && Sizing.RowHeight) + "px",
    outline: 'none',
    tableLayout: 'fixed',
    verticalAlign: 'bottom',
    width: '100%'
};
exports.rowStyle = rowStyle;
var rowHighlightStyle = shared_widgets_1.assign({}, rowStyle, {
    background: Colors && Colors.F5
});
exports.rowHighlightStyle = rowHighlightStyle;
var headerRowStyle = shared_widgets_1.assign({}, rowStyle, {
    borderBottom: 0,
    borderLeft: (Sizing && Sizing.BorderWidth) + "px solid",
    borderLeftColor: Colors && Colors.L2,
    borderRight: (Sizing && Sizing.BorderWidth) + "px solid",
    borderRightColor: Colors && Colors.L2,
    borderTop: (Sizing && Sizing.BorderWidth) + "px solid",
    borderTopColor: Colors && Colors.L2,
    fontSize: Typography && Typography.Sizing && Typography.Sizing.Default,
    fontWeight: 'normal',
    textAlign: 'left'
});
exports.headerRowStyle = headerRowStyle;
var stripedRowStyle = shared_widgets_1.assign({}, rowStyle, {
    background: Colors && Colors.F2
});
exports.stripedRowStyle = stripedRowStyle;
var rowUnsupportedFileTypeStyle = shared_widgets_1.assign({}, rowStyle, {
    color: Colors && Colors.F7Disabled,
});
exports.rowUnsupportedFileTypeStyle = rowUnsupportedFileTypeStyle;
var tableStyle = {
    border: (Sizing && Sizing.BorderWidth) + "px solid",
    borderColor: Colors && Colors.L2,
    borderCollapse: 'collapse',
    height: (shared_widgets_1.TabStyles && shared_widgets_1.TabStyles.Sizing && (shared_widgets_1.TabStyles.Sizing.BaseUnit || 6) * 71) + "px",
    overflowY: 'overlay',
    width: '100%'
};
exports.tableStyle = tableStyle;
//# sourceMappingURL=TableStyles.js.map