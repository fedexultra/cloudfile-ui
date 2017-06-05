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
import { assign, PointerEventProps, PointerEventWrapper } from 'shared-widgets';
import { BodyCell } from './BodyCell';
import { CloudItemType } from '../types/CloudItemTypes';
import { getCloudFileColumns } from '../constants/CloudFileColumns';
import { Row } from '../types/DataGridTypes';
import { rowStyle, stripedRowStyle, rowHighlightStyle, rowUnsupportedFileTypeStyle } from '../styles/TableStyles';
import { getUniqueCellId } from '../utils/TestUtilities';

interface BodyRowProps extends React.Props<void> {
  row: Row;
  rowId: number;
  onConnect: () => void;
  onFolderOpened: (rowId: number) => void;
  onRowSelected: (rowId: number) => void;
  selected: boolean;
};

class BodyRow extends React.Component<BodyRowProps, void> {

  public static idPrefix: string = 'gridRow_';

  public constructor(props: BodyRowProps) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleRowOpened = this.handleRowOpened.bind(this);
    this.handleRowSelected = this.handleRowSelected.bind(this);
  }

  public shouldComponentUpdate(nextProps: BodyRowProps): boolean {
    return (this.props.selected !== nextProps.selected) || (this.props.row !== nextProps.row);
  }

  private getRenderedStyle(): React.CSSProperties {
    if (this.props.selected) {
      return rowHighlightStyle;
    } else {
      let styleToApply = this.props.rowId % 2 === 1 ? rowStyle : stripedRowStyle;
      if (!this.props.row.cloudItem.displayAsEnabled) {
        return assign({}, styleToApply, rowUnsupportedFileTypeStyle);
      } else {
        return styleToApply;
      }
    }
  }

  private handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>): void {
    if (event.key === 'Enter') {
      if (this.props.row.cloudItem.type === CloudItemType.File) {
        this.props.onConnect();
      } else if (this.props.selected && this.props.row.cloudItem.type === CloudItemType.Folder) {
        this.props.onFolderOpened(this.props.rowId);
      }
    }
  }

  private handleRowOpened(): void {
    if (this.props.row.cloudItem.type === CloudItemType.File && this.props.row.cloudItem.canBeSelected) {
      this.props.onConnect();
    } else if (this.props.row.cloudItem.type === CloudItemType.Folder) {
      this.props.onFolderOpened(this.props.rowId);
    }
  }

  private handleRowSelected(): void {
    this.props.onRowSelected(this.props.rowId);
  }

  private getRowId(): string {
    return BodyRow.idPrefix + this.props.rowId;
  }

  public render(): JSX.Element {
    const pointerEventProps: PointerEventProps = {
      pointerClick: this.handleRowSelected,
      pointerDoubleClick: this.handleRowOpened
    };
    const cells = getCloudFileColumns().map((column, i) => {
      return <BodyCell
        value={ column.getCellFromRow(this.props.row) }
        width={ column.width }
        hasBorder={ column.hasBorder }
        icon={ column.getIconFromRow(this.props.row) }
        handleFolderTextClicked={ this.handleRowOpened }
        // This value is used to uniquely identify cells, which helps with automation.
        testValueUniqueCellId={ getUniqueCellId(this.props.rowId, i) }
        key={ i } />;
    });
    let renderedStyle: React.CSSProperties = this.getRenderedStyle();
    return (
      <PointerEventWrapper { ...pointerEventProps }>
        <div id={ this.getRowId() } onKeyDown={ this.handleKeyDown } style={ renderedStyle } tabIndex={-1}>{ cells }</div>
      </PointerEventWrapper>
    );
  }

}

export { BodyRowProps, BodyRow }
