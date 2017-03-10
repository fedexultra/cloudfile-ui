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
var ErrorStyle = {
    display: 'table',
    height: (shared_widgets_1.TabStyles && shared_widgets_1.TabStyles.Sizing && (shared_widgets_1.TabStyles.Sizing.BaseUnit || 6) * 75.5) + "px",
    paddingBottom: shared_widgets_1.TabStyles.Spacing && shared_widgets_1.TabStyles.Spacing.LargeSpace,
    textAlign: 'center',
    width: '100%'
};
exports.ErrorStyle = ErrorStyle;
//# sourceMappingURL=ErrorStyles.js.map