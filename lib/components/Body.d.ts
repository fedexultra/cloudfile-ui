/// <reference types="react" />
import * as React from 'react';
import { CloudItem } from '../types/CloudItemTypes';
import { Row } from '../types/DataGridTypes';
interface BodyProps extends React.Props<void> {
    rows: Row[];
    onItemSelected: (item: CloudItem) => void;
    onFolderOpened: (item: CloudItem) => void;
    onConnect: () => void;
}
interface BodyState {
    highlightRow: Row;
}
declare class Body extends React.Component<BodyProps, BodyState> {
    constructor(props: BodyProps);
    private onFolderOpened(rowId);
    private onRowSelected(rowId);
    render(): JSX.Element;
}
export { BodyProps, BodyState, Body };
