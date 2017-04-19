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
import { Body } from './Body';
import { CloudItem } from '../types/CloudItemTypes';
import { Row } from '../types/DataGridTypes';
import { HeaderRow } from './HeaderRow';
import { SortOrder } from '../types/SortOrderTypes';
import { tableStyle } from '../styles/TableStyles';
import { GridStyle } from '../styles/FilterableDataGridStyles';

interface DataGridProps extends React.Props<void> {
  rows: Row[];
  onColumnSelected: (columnId: number) => void;
  onItemSelected: (item: CloudItem) => void;
  onFolderOpened: (item: CloudItem) => void;
  onConnect: () => void;
  sortableColumnId: number;
  sortOrder: SortOrder;
};

class DataGrid extends React.Component<DataGridProps, void> {

  public render(): JSX.Element {
    return (
      <div style={GridStyle}>
        <HeaderRow onColumnSelected={this.props.onColumnSelected}
          sortableColumnId={this.props.sortableColumnId}
          sortOrder={this.props.sortOrder} />
        <div style={tableStyle}>
          <Body rows={this.props.rows}
            onItemSelected={this.props.onItemSelected}
            onFolderOpened={this.props.onFolderOpened}
            onConnect={this.props.onConnect} />
        </div>
      </div>
    );
  }

}

export { DataGridProps, DataGrid }
