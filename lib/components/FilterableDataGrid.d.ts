/// <reference types="react" />
import * as React from 'react';
import { BasicCloudItem, CloudItem } from '../types/CloudItemTypes';
import { ProviderInfo } from '../providers/ProviderInfo';
import { Requestor } from '../requestors/Requestor';
import { Row } from '../types/DataGridTypes';
import { SortOrder } from '../types/SortOrderTypes';
interface FilterableDataGridProps extends React.Props<void> {
    providerInfo: ProviderInfo;
    requestor: Requestor;
    onItemSelected: (item: CloudItem) => void;
    onFolderOpened: (itemId: string) => void;
    onConnect: () => void;
}
interface FilterableDataGridState {
    query: string;
    resetQuery: boolean;
    folderId: string;
    displayBreadcrumb: boolean;
    breadcrumb: BasicCloudItem[];
    sortableColumnId: number;
    sortOrder: SortOrder;
    displaySpinner: boolean;
    rows: Row[];
}
declare class FilterableDataGrid extends React.Component<FilterableDataGridProps, FilterableDataGridState> {
    constructor(props: FilterableDataGridProps);
    componentDidMount(): void;
    private fetchItemsAndUpdateState(nextState);
    private getBreadCrumb();
    private getErrorMessage();
    private getNextSortOrder(columnId);
    private handleQueryCancel();
    private handleQueryEnter(query);
    private onBreadcrumbSelected(item);
    private onColumnSelected(columnId);
    private onItemSelected(item);
    private onFolderOpened(item);
    private setDisplaySpinnerState();
    render(): JSX.Element;
}
export { FilterableDataGridProps, FilterableDataGridState, FilterableDataGrid };
