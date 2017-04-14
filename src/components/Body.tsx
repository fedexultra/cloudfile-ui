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
  highlightRow: number;
}

class Body extends React.Component<BodyProps, BodyState> {

  public constructor(props: BodyProps) {
    super(props);
    this.decrementRow = this.decrementRow.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.incrementRow = this.incrementRow.bind(this);
    this.onFolderOpened = this.onFolderOpened.bind(this);
    this.onRowSelected = this.onRowSelected.bind(this);
    this.state = {highlightRow: -1};
  }

  public componentWillReceiveProps(nextProps: BodyProps) {
    // If the parent triggers a re-render (e.g. when clicking a breadcrumb), reset the active row
    if (nextProps.rows.length != this.props.rows.length) {
      // Quick and dirty check if we are receiving new rows. Better to be a little conservative than do an
      // expensive array comparison.
      this.setState({highlightRow: -1});
    }
  }

  private handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>): void {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault(); // Prevent the auto-scroll behavior
      const nextHighlightRow = this.getNextSelectableRow(event.key === 'ArrowDown' ? this.incrementRow : this.decrementRow);
      this.setState({highlightRow: nextHighlightRow});
      
      // Scroll to keep the focused grid row in view, if needed
      let row: HTMLElement = document.getElementById('gridRow_' + nextHighlightRow)!;
      row.scrollIntoView(false); // Keep bottom of element aligned with the visible area
    }
  }

  private getNextSelectableRow(nextRowFunc: (rowId: number) => number): number {
    // Try rows starting with the next row (or row 0 if at the end of the grid)
    let nextHighlightRow = this.state.highlightRow;
    let inspected = 0;
    // Check each other row
    while (inspected++ < this.props.rows.length - 1) {
      nextHighlightRow = nextRowFunc(nextHighlightRow);
      if (this.props.rows[nextHighlightRow].cloudItem.canBeSelected) {
        // Return the first subsequent row that is selectable
        return nextHighlightRow;
      }
    }
    // No, or no other rows are selectable
    return this.state.highlightRow;
  }

  private incrementRow(rowId: number): number {
    if (rowId == this.props.rows.length - 1) {
      return 0;
    } else {
      return ++rowId;
    }
  }

  private decrementRow(rowId: number): number {
    if (rowId === -1 || rowId === 0) {
      return this.props.rows.length - 1;
    } else {
      return --rowId;
    }
  }

  private onFolderOpened(rowId: number): void {
    if (this.props.rows[rowId].cloudItem.type === CloudItemType.Folder) {
      this.props.onFolderOpened(this.props.rows[rowId].cloudItem);
    }
    this.setState({highlightRow: -1});
  }

  private onRowSelected(rowId: number): void {
    if (!this.props.rows[rowId].cloudItem.canBeSelected) {
      return;
    }
    this.props.onItemSelected(this.props.rows[rowId].cloudItem);
    this.setState({highlightRow: rowId});
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
    return <div tabIndex={0} onKeyDown={this.handleKeyDown}>{ bodyRows }</div>;
  }

}

 export { BodyProps, BodyState, Body }
