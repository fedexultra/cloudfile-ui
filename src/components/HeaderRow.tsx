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
import { ArrowDownIcon, ArrowUpIcon } from '../icons/Icons';
import { getCloudFileColumns } from '../constants/CloudFileColumns';
import { HeaderCell } from './HeaderCell';
import { headerRowStyle } from '../styles/TableStyles';
import { SortOrder } from '../types/SortOrderTypes';

interface HeaderRowProps extends React.Props<void> {
  onColumnSelected: (columnId: number) => void;
  sortableColumnId: number;
  sortOrder: SortOrder;
};

class HeaderRow extends React.Component<HeaderRowProps, void> {

  public render(): JSX.Element {

    const columns = getCloudFileColumns().map((column, i) => {
      if (column.id === this.props.sortableColumnId) {
        return <HeaderCell column={column}
          icon={this.props.sortOrder === SortOrder.ascending ?  ArrowUpIcon : ArrowDownIcon}
          onColumnSelected={this.props.onColumnSelected}
          key={i}/>;
      }
      return <HeaderCell column={column} onColumnSelected={this.props.onColumnSelected} key={i}/>;
    });

    return (
      <div style={headerRowStyle}>{ columns }</div>
    );
  }

}

export { HeaderRowProps, HeaderRow }
