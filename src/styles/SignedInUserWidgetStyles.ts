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

const SignedInUserWidgetStyle: CSSProperties = {
  flex: '0 0 auto',
  position: 'absolute',
  right: TabStyles && TabStyles.Spacing && TabStyles.Spacing.LargeSpace,
  textAlign: 'right',
  top: TabStyles && TabStyles.Spacing && TabStyles.Spacing.LargeSpace,
  WebkitFlex: '0 0 auto'
};

export { SignedInUserWidgetStyle };
