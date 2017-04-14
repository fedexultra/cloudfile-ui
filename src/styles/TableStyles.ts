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

const { Colors, Sizing, Spacing, Typography } = TabStyles;

const cellStyle: CSSProperties = {
  cursor: 'default',
  display: 'table-cell',
  paddingBottom: 0,
  paddingLeft: Spacing && Spacing.DefaultSpace,
  paddingRight: Spacing && Spacing.DefaultSpace,
  opacity: 0.8
};

const rowStyle: CSSProperties = {
  borderBottom: `${Sizing && Sizing.BorderWidth}px solid`,
  borderBottomColor: Colors && Colors.L2,
  display: 'table',
  fontSize: Typography && Typography.Sizing && Typography.Sizing.Small,
  fontFamily: Typography && Typography.FontFamily,
  height: Sizing && Sizing.RowHeight,
  lineHeight: `${Sizing && Sizing.RowHeight}px`,
  outline: 'none',
  tableLayout: 'fixed',
  verticalAlign: 'bottom',
  width: '100%'
};

const rowHighlightStyle: CSSProperties = assign({}, rowStyle, {
  background: Colors && Colors.F5
});

const headerRowStyle: CSSProperties = assign({}, rowStyle, {
  borderBottom: 0,
  borderLeft: `${Sizing && Sizing.BorderWidth}px solid`,
  borderLeftColor: Colors && Colors.L2,
  borderRight: `${Sizing && Sizing.BorderWidth}px solid`,
  borderRightColor: Colors && Colors.L2,
  borderTop: `${Sizing && Sizing.BorderWidth}px solid`,
  borderTopColor: Colors && Colors.L2,
  fontSize: Typography && Typography.Sizing && Typography.Sizing.Default,
  fontWeight: 'normal',
  textAlign: 'left',
  WebkitFlex: '0 0 auto',
});

const stripedRowStyle: CSSProperties = assign({}, rowStyle, {
  background: Colors && Colors.F2
});

const rowUnsupportedFileTypeStyle: CSSProperties = assign({}, rowStyle, {
  color: Colors && Colors.F7Disabled,
});

const tableStyle: CSSProperties = {
  border: `${Sizing && Sizing.BorderWidth}px solid`,
  borderColor: Colors && Colors.L2,
  borderCollapse: 'collapse',
  overflowY: 'auto',
  width: '100%',
  flex: '1 1 auto',
  WebkitFlex: '1 1 auto',
};

export { cellStyle, rowStyle, headerRowStyle, stripedRowStyle, tableStyle, rowHighlightStyle, rowUnsupportedFileTypeStyle };
