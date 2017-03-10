/// <reference types="react" />
import * as React from 'react';
import { CloudItem } from '../types/CloudItemTypes';
import { Row } from '../types/DataGridTypes';
import { SortOrder } from '../types/SortOrderTypes';
interface DataGridProps extends React.Props<void> {
    rows: Row[];
    onColumnSelected: (columnId: number) => void;
    onItemSelected: (item: CloudItem) => void;
    onFolderOpened: (item: CloudItem) => void;
    onConnect: () => void;
    sortableColumnId: number;
    sortOrder: SortOrder;
}
declare class DataGrid extends React.Component<DataGridProps, void> {
    render(): JSX.Element;
}
export { DataGridProps, DataGrid };
