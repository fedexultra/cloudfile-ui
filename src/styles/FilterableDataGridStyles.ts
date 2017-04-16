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

const FilterableDataGridStyle: CSSProperties = {
  height: '100%',
  padding: TabStyles && TabStyles.Spacing && TabStyles.Spacing.LargeSpace,
  position: 'relative',
  boxSizing: 'border-box',
  display: '-webkit-flex',
  flexFlow: 'column',
  WebkitFlexFlow: 'column'
};

const WrapperStyle: CSSProperties = {
  flex: '1 1 auto',
  WebkitFlex: '1 1 auto',
  display: '-webkit-flex',
  flexFlow: 'column',
  WebkitFlexFlow: 'column'
};

const GridStyle: CSSProperties = {
  flex: '1 1 auto',
  WebkitFlex: '1 1 auto',
  display: '-webkit-flex',
  flexFlow: 'column',
  WebkitFlexFlow: 'column',
  overflowY: 'auto',
  boxSizing: 'border-box'
};

export { FilterableDataGridStyle, WrapperStyle, GridStyle };
