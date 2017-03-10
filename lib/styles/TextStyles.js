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
var Colors = shared_widgets_1.TabStyles.Colors, Spacing = shared_widgets_1.TabStyles.Spacing, Typography = shared_widgets_1.TabStyles.Typography;
var errorMessageStyle = {
    color: Colors && Colors.AttentionLight,
    display: 'table-cell',
    fontFamily: Typography && Typography.FontFamily,
    fontSize: Typography && Typography.Sizing && Typography.Sizing.Default,
    fontWeight: 'bold',
    verticalAlign: 'middle'
};
exports.errorMessageStyle = errorMessageStyle;
var hoverStyle = {
    cursor: 'pointer',
    textDecoration: 'underline'
};
exports.hoverStyle = hoverStyle;
var signedInStyle = {
    fontSize: Typography && Typography.Sizing && Typography.Sizing.Small,
    fontFamily: Typography && Typography.FontFamily,
    fontWeight: 'normal'
};
exports.signedInStyle = signedInStyle;
var signOutStyle = shared_widgets_1.assign({}, signedInStyle, {
    color: Colors && Colors.Discrete,
});
exports.signOutStyle = signOutStyle;
var signedInUserStyle = {
    paddingBottom: Spacing && Spacing.LargeSpace,
    textAlign: 'right'
};
exports.signedInUserStyle = signedInUserStyle;
//# sourceMappingURL=TextStyles.js.map