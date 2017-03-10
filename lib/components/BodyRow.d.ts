/// <reference types="react" />
import * as React from 'react';
import { Row } from '../types/DataGridTypes';
interface BodyRowProps extends React.Props<void> {
    row: Row;
    rowId: number;
    onConnect: () => void;
    onFolderOpened: (rowId: number) => void;
    onRowSelected: (rowId: number) => void;
    currentHighlightedRow: Row;
}
declare class BodyRow extends React.Component<BodyRowProps, void> {
    constructor(props: BodyRowProps);
    private getRenderedStyle();
    private handleKeyDown(event);
    private handleRowOpened();
    private handleRowSelected();
    render(): JSX.Element;
}
export { BodyRowProps, BodyRow };
