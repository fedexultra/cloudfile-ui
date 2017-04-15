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

import { assign, TabStyles } from 'shared-widgets';
import { CSSProperties } from 'react';
import { SpaceStyle } from './SpaceStyles';

const { Colors, Spacing, Typography } = TabStyles;

const BREADCRUMB_ITEM_WIDTH = 150;

const BreadcrumbSpaceStyle: CSSProperties = assign({}, SpaceStyle, {
  display: 'block',
  boxSizing: 'border-box',
  flex: '0 0 auto',
  WebkitFlex: '0 0 auto'
});

const BreadcrumbStyle: CSSProperties = {
  paddingBottom: Spacing && Spacing.LargeSpace,
  whiteSpace: 'pre'
};

const BreadcrumbTextStyle: CSSProperties = {
  color: Colors && Colors.L9,
  cursor: 'default',
  fontFamily: Typography && Typography.FontFamily,
  fontSize: Typography && Typography.Sizing && Typography.Sizing.Default,
};

const ElidedTextStyle: CSSProperties = {
  display: 'inline-block',
  maxWidth: `${BREADCRUMB_ITEM_WIDTH}px`,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  verticalAlign: 'middle',
  whiteSpace: 'nowrap'
};

const BreadcrumbElidedTextStyle: CSSProperties = assign({}, BreadcrumbTextStyle, ElidedTextStyle);

const ElidedFolderStyle: CSSProperties = assign({}, ElidedTextStyle, {
  color: Colors && Colors.DiscreteDark,
  cursor: 'pointer',
  fontFamily: Typography && Typography.FontFamily,
  fontSize: Typography && Typography.Sizing && Typography.Sizing.Default
});

const HoverFolderStyle: CSSProperties = assign({}, ElidedFolderStyle, {
  textDecoration: 'underline'
});

export { BREADCRUMB_ITEM_WIDTH, BreadcrumbElidedTextStyle,
  BreadcrumbSpaceStyle, BreadcrumbStyle, BreadcrumbTextStyle,
  ElidedFolderStyle, HoverFolderStyle };
