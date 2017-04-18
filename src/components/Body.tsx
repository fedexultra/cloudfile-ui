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
import { NullRow, Row } from '../types/DataGridTypes';

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

  private static defaultHighlightRow: Row = new NullRow();

  public constructor(props: BodyProps) {
    super(props);
    this.decrementRowId = this.decrementRowId.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.incrementRowId = this.incrementRowId.bind(this);
    this.onFolderOpened = this.onFolderOpened.bind(this);
    this.onRowSelected = this.onRowSelected.bind(this);
    this.state = {highlightRow: Body.defaultHighlightRow};
  }

  public componentWillReceiveProps(nextProps: BodyProps): void {
    // If the parent triggers a re-render (e.g. when clicking a breadcrumb), reset the active row
    if (nextProps.rows !== this.props.rows) {
      this.setState({highlightRow: Body.defaultHighlightRow});
    }
  }

  private handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>): void {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault(); // Prevent the auto-scroll behavior
      const nextHighlightRowId = this.getNextSelectableRowId(event.key === 'ArrowDown' ? this.incrementRowId : this.decrementRowId);
      if (nextHighlightRowId < 0) {
        // No rows are selectable
        return;
      }

      // Notify parent that we arrow'ed to a new item
      const nextHighlightRow = this.props.rows[nextHighlightRowId];
      this.props.onItemSelected(nextHighlightRow.cloudItem);
      this.setState({highlightRow: nextHighlightRow});

      // Scroll to keep the focused grid row in view, if needed
      let row: HTMLElement = document.getElementById(BodyRow.idPrefix + nextHighlightRowId)!;
      row.scrollIntoView(false); // Keep bottom of element aligned with the visible area
      row.focus(); // Let the row know it is active so it can capture 'enter' events to connect
    }
  }

  private getNextSelectableRowId(nextRowIdFunc: (rowId: number) => number): number {
    // Try rows starting with the next row (or row 0 if at the end of the grid)
    const highlightRowId: number = this.getRowId(this.state.highlightRow);
    let nextHighlightRowId = highlightRowId;
    let inspected = 0;
    // Check each other row
    while (inspected++ < this.props.rows.length - 1) {
      nextHighlightRowId = nextRowIdFunc(nextHighlightRowId);
      if (this.props.rows[nextHighlightRowId].cloudItem.canBeSelected) {
        // Return the first subsequent row that is selectable
        return nextHighlightRowId;
      }
    }
    // No, or no other rows are selectable
    return highlightRowId;
  }

  private incrementRowId(rowId: number): number {
    if (rowId === this.props.rows.length - 1) {
      return 0;
    } else {
      return ++rowId;
    }
  }

  private decrementRowId(rowId: number): number {
    if (rowId === -1 || rowId === 0) {
      return this.props.rows.length - 1;
    } else {
      return --rowId;
    }
  }

  private getRowId(row: Row): number {
    let rowId = -1;
    for (let i = 0; i < this.props.rows.length; i++) {
      if (this.props.rows[i] === row) {
        rowId = i;
        break;
      }
    }
    return rowId;
  }

  private onFolderOpened(rowId: number): void {
    if (this.props.rows[rowId].cloudItem.type === CloudItemType.Folder) {
      this.props.onFolderOpened(this.props.rows[rowId].cloudItem);
    }
    this.setState({highlightRow: Body.defaultHighlightRow});
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
    return <div tabIndex={0} onKeyDown={this.handleKeyDown}>{ bodyRows }</div>;
  }

}

 export { BodyProps, BodyState, Body }
