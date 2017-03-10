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
var SpaceStyles_1 = require("./SpaceStyles");
var Colors = shared_widgets_1.TabStyles.Colors, Spacing = shared_widgets_1.TabStyles.Spacing, Typography = shared_widgets_1.TabStyles.Typography;
var BREADCRUMB_ITEM_WIDTH = 150;
exports.BREADCRUMB_ITEM_WIDTH = BREADCRUMB_ITEM_WIDTH;
var BreadcrumbSpaceStyle = shared_widgets_1.assign({}, SpaceStyles_1.SpaceStyle, {
    display: 'block'
});
exports.BreadcrumbSpaceStyle = BreadcrumbSpaceStyle;
var BreadcrumbStyle = {
    paddingBottom: Spacing && Spacing.LargeSpace,
    whiteSpace: 'pre'
};
exports.BreadcrumbStyle = BreadcrumbStyle;
var BreadcrumbTextStyle = {
    color: Colors && Colors.L9,
    cursor: 'default',
    fontFamily: Typography && Typography.FontFamily,
    fontSize: Typography && Typography.Sizing && Typography.Sizing.Default,
};
exports.BreadcrumbTextStyle = BreadcrumbTextStyle;
var ElidedTextStyle = {
    display: 'inline-block',
    maxWidth: BREADCRUMB_ITEM_WIDTH + "px",
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    verticalAlign: 'middle',
    whiteSpace: 'nowrap'
};
var BreadcrumbElidedTextStyle = shared_widgets_1.assign({}, BreadcrumbTextStyle, ElidedTextStyle);
exports.BreadcrumbElidedTextStyle = BreadcrumbElidedTextStyle;
var ElidedFolderStyle = shared_widgets_1.assign({}, ElidedTextStyle, {
    color: Colors && Colors.DiscreteDark,
    cursor: 'pointer',
    fontFamily: Typography && Typography.FontFamily,
    fontSize: Typography && Typography.Sizing && Typography.Sizing.Default
});
exports.ElidedFolderStyle = ElidedFolderStyle;
var HoverFolderStyle = shared_widgets_1.assign({}, ElidedFolderStyle, {
    textDecoration: 'underline'
});
exports.HoverFolderStyle = HoverFolderStyle;
//# sourceMappingURL=BreadcrumbStyles.js.map