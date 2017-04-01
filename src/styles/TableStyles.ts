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
  paddingRight: Spacing && Spacing.DefaultSpace
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
  textAlign: 'left'
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
  height: `${TabStyles && TabStyles.Sizing && (TabStyles.Sizing.BaseUnit || 6) * 71}px`,
  overflowY: 'inherit',
  width: '100%'
};

export { cellStyle, rowStyle, headerRowStyle, stripedRowStyle, tableStyle, rowHighlightStyle, rowUnsupportedFileTypeStyle };
