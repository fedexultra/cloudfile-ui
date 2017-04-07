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

const ErrorStyle: CSSProperties = {
  display: 'table',
  height: `${TabStyles && TabStyles.Sizing && (TabStyles.Sizing.BaseUnit || 6) * 75.5}px`,
  paddingBottom: TabStyles.Spacing && TabStyles.Spacing.LargeSpace,
  textAlign: 'center',
  width: '100%'
};

export { ErrorStyle };
