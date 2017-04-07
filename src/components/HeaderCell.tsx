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

import * as React from 'react';
import { assign, TabStyles } from 'shared-widgets';
import { cellStyle } from '../styles/TableStyles';
import { Column } from '../types/DataGridTypes';
import { ColumnSortIconStyle } from '../styles/IconStyles';
import { Icon } from '../components/Icon';
import { IconDefinition } from '../types/IconTypes';

const { Colors, Sizing } = TabStyles;

interface HeaderCellProps extends React.Props<void> {
  column: Column;
  icon?: IconDefinition;
  onColumnSelected: (columnId: number) => void;
};

class HeaderCell extends React.Component<HeaderCellProps, void> {

  public constructor(props: HeaderCellProps) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  private onClick(): void {
    this.props.onColumnSelected(this.props.column.id);
  }

  public render(): JSX.Element {
    const perCellStyle: React.CSSProperties = assign({}, cellStyle, {
      borderLeft: this.props.column.hasBorder ? `${Sizing && Sizing.BorderWidth}px solid` : 0,
      borderRight: this.props.column.hasBorder ? `${Sizing && Sizing.BorderWidth}px solid` : 0,
      borderLeftColor: Colors && Colors.L2,
      borderRightColor: Colors && Colors.L2,
      width: this.props.column.width,
    });

    return (
      <span onClick={this.onClick} style={perCellStyle}>
        { this.props.column.title }
        { this.props.icon ? <Icon source={this.props.icon.source} style={ColumnSortIconStyle} /> : undefined}
      </span>
    );
  }

}

export { HeaderCellProps, HeaderCell }
