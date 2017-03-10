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

import { CSSProperties } from 'react';
import { TabStyles } from 'shared-widgets';

const { Spacing } = TabStyles;

const ColumnSortIconStyle: CSSProperties = {
  float: 'right',
  paddingRight: Spacing && Spacing.SmallSpace,
  paddingTop: Spacing && Spacing.SmallSpace,
};

const DataGridRowIconStyle: CSSProperties = {
  verticalAlign: 'top',
  paddingRight: Spacing && Spacing.SmallSpace,
  paddingTop: Spacing && Spacing.SmallSpace,
  paddingBottom: Spacing && Spacing.SmallSpace,
};

export { ColumnSortIconStyle, DataGridRowIconStyle };
