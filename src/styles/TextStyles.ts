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

const { Colors, Spacing, Typography } = TabStyles;

const errorMessageStyle: CSSProperties = {
  color: Colors && Colors.AttentionLight,
  display: 'table-cell',
  fontFamily: Typography && Typography.FontFamily,
  fontSize: Typography && Typography.Sizing && Typography.Sizing.Default,
  fontWeight: 'bold',
  verticalAlign: 'middle'
};

const hoverStyle: CSSProperties = {
  cursor: 'pointer',
  textDecoration: 'underline'
};

const signedInStyle: CSSProperties = {
  fontSize: Typography && Typography.Sizing && Typography.Sizing.Small,
  fontFamily: Typography && Typography.FontFamily,
  fontWeight: 'normal'
};

const signOutStyle: CSSProperties = assign({}, signedInStyle, {
  color: Colors && Colors.Discrete,
});

const signedInUserStyle: CSSProperties = {
  paddingBottom: Spacing && Spacing.LargeSpace,
  textAlign: 'right'
};

export { errorMessageStyle, hoverStyle, signedInStyle, signOutStyle, signedInUserStyle };
