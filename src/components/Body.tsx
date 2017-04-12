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
import { BodyRow } from './BodyRow';
import { CloudItem, CloudItemType } from '../types/CloudItemTypes';
import { Row } from '../types/DataGridTypes';

interface BodyProps extends React.Props<void> {
  rows: Row[];
  onItemSelected: (item: CloudItem) => void;
  onFolderOpened: (item: CloudItem) => void;
  onConnect: () => void;
};

interface BodyState {
  highlightRow: Row;
}

class Body extends React.Component<BodyProps, BodyState> {

  public constructor(props: BodyProps) {
    super(props);
    this.onFolderOpened = this.onFolderOpened.bind(this);
    this.onRowSelected = this.onRowSelected.bind(this);
    this.state = {highlightRow: this.props.rows[0]};
  }

  private onFolderOpened(rowId: number): void {
    if (this.props.rows[rowId].cloudItem.type === CloudItemType.Folder) {
      this.props.onFolderOpened(this.props.rows[rowId].cloudItem);
    }
    this.setState({highlightRow: this.props.rows[rowId]});
  }

  private onRowSelected(rowId: number): void {
    if (!this.props.rows[rowId].cloudItem.canBeSelected) {
      return;
    }
    this.props.onItemSelected(this.props.rows[rowId].cloudItem);
    this.setState({highlightRow: this.props.rows[rowId]});
  }

  public render(): JSX.Element {
    const bodyRows = this.props.rows.map((row, i) => {
      return <BodyRow
        onConnect={this.props.onConnect}
        onFolderOpened={this.onFolderOpened}
        onRowSelected={this.onRowSelected}
        row={row}
        key={i}
        rowId={i}
        currentHighlightedRow={this.state.highlightRow}/>;
    });
    return <div tabIndex={0}>{ bodyRows }</div>;
  }

}

 export { BodyProps, BodyState, Body }
