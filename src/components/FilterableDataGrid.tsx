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

import * as ColumnUtilities from '../utils/ColumnUtilities';
import * as React from 'react';

import { BasicCloudItem, CloudItem, CloudItemType } from '../types/CloudItemTypes';
import { Breadcrumb } from './Breadcrumb';
import { BreadcrumbTextStyle } from '../styles/BreadcrumbStyles';
import { createBasicCloudItem } from '../utils/CloudItemUtilities';
import { DataGrid } from './DataGrid';
import { ErrorWidget } from './ErrorWidget';
import { Messages } from '../codegen/Localize';
import { ProviderInfo } from '../providers/ProviderInfo';
import { Requestor } from '../requestors/Requestor';
import { Row } from '../types/DataGridTypes';
import { SearchBar } from './SearchBar';
import { SearchBarStyle } from '../styles/SearchBarStyles';
import { SignedInUserWidget } from './SignedInUserWidget';
import { SignedInUserWidgetStyle } from '../styles/SignedInUserWidgetStyles';
import { SortOrder } from '../types/SortOrderTypes';
import { SpaceStyle } from '../styles/SpaceStyles';
import { Spinner } from './Spinner';

interface FilterableDataGridProps extends React.Props<void> {
  providerInfo: ProviderInfo;
  requestor: Requestor;
  onItemSelected: (item: CloudItem) => void;
  onFolderOpened: (itemId: string) => void;
  onConnect: () => void;
};

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

class FilterableDataGrid extends React.Component<FilterableDataGridProps, FilterableDataGridState> {

  public constructor(props: FilterableDataGridProps) {
    super(props);
    this.state = {
      query: '',
      resetQuery: true,
      folderId: this.props.providerInfo.getDefaultFolder(),
      displayBreadcrumb: true,
      breadcrumb: [ { id: this.props.providerInfo.getDefaultFolder(),
                      name: props.providerInfo.getProviderName(),
                      type: CloudItemType.Folder } ],
      sortableColumnId: 0,
      sortOrder: SortOrder.ascending,
      displaySpinner: true,
      rows: []
    };

    this.fetchItemsAndUpdateState = this.fetchItemsAndUpdateState.bind(this);
    this.handleQueryCancel = this.handleQueryCancel.bind(this);
    this.handleQueryEnter = this.handleQueryEnter.bind(this);
    this.onBreadcrumbSelected = this.onBreadcrumbSelected.bind(this);
    this.onColumnSelected = this.onColumnSelected.bind(this);
    this.onFolderOpened = this.onFolderOpened.bind(this);
    this.onItemSelected = this.onItemSelected.bind(this);
    this.setDisplaySpinnerState = this.setDisplaySpinnerState.bind(this);
  }

  public componentDidMount(): void {
    this.fetchItemsAndUpdateState(this.state);
  }

  private fetchItemsAndUpdateState(nextState: FilterableDataGridState): void {
    this.setDisplaySpinnerState();
    this.props.requestor.enumerateItems(nextState.folderId).then((items) => {
      let rows: Row[] = items.map(item => ({cloudItem: item}));
      rows = ColumnUtilities.sortColumn(rows, nextState.sortableColumnId, nextState.sortOrder);
      this.setState({
        query: nextState.query,
        resetQuery: nextState.resetQuery,
        folderId: nextState.folderId,
        displayBreadcrumb: nextState.displayBreadcrumb,
        breadcrumb: nextState.breadcrumb,
        sortableColumnId: nextState.sortableColumnId,
        sortOrder: nextState.sortOrder,
        displaySpinner: false,
        rows: rows
      });
    });
  }

  private getBreadCrumb(): JSX.Element {
    if (this.state.displayBreadcrumb) {
      return <Breadcrumb trail={this.state.breadcrumb} onItemSelected={this.onBreadcrumbSelected} />;
    } else {
      return (
        <section style={SpaceStyle}>
          <span data-tb-test-id={'filterable-data-grid-search-results-message'} style={BreadcrumbTextStyle}>
            { Messages.searchResultsMessage() }
          </span>
        </section>
      );
    }
  }

  private getErrorMessage(): string {
    if (Requestor.searchUrlRegex.test(this.state.query)) {
      return Messages.urlErrorMessage();
    } else {
      return Messages.queryErrorMessage();
    }
  }

  // Flip sort order
  private getNextSortOrder(columnId: number): SortOrder {
    if (columnId === this.state.sortableColumnId) {
      // Alternate between ascending and descending order by calculating the "current
      // sort order" modulo "enum size"
      const sortOrderNumber: number = (this.state.sortOrder + 1) % SortOrder.COUNT;
      return sortOrderNumber;
    }
    return SortOrder.ascending;
  }

  private handleQueryCancel(): void {
    const newBreadcrumb: BasicCloudItem[] = this.state.breadcrumb;
    if (this.state.breadcrumb[this.state.breadcrumb.length - 1].id !== this.state.folderId) {
      newBreadcrumb.pop();
    }
    this.fetchItemsAndUpdateState({
      query: '',
      resetQuery: true,
      folderId: this.state.folderId,
      displayBreadcrumb: true,
      breadcrumb: newBreadcrumb,
      sortableColumnId: this.state.sortableColumnId,
      sortOrder: this.state.sortOrder,
      displaySpinner: this.state.displaySpinner,
      rows: this.state.rows
    });
    this.props.onFolderOpened(this.state.folderId);
  };

  private handleQueryEnter(query: string): void {
    if (query === '') { // Display current folder's contents
      this.handleQueryCancel();
    } else { // Search through Box account
      this.setDisplaySpinnerState();
      this.props.requestor.search(query).then((items) => {
        let rows: Row[] = items.map(item => ({cloudItem: item}));
        rows = ColumnUtilities.sortColumn(rows, this.state.sortableColumnId, this.state.sortOrder);
        this.setState({
          query: query,
          resetQuery: true,
          folderId: this.state.folderId,
          displayBreadcrumb: false, // 'Search Results' message should be displayed
          breadcrumb: this.state.breadcrumb,
          sortableColumnId: this.state.sortableColumnId,
          sortOrder: this.state.sortOrder,
          displaySpinner: false,
          rows: rows
        });
      });

      this.props.onFolderOpened(this.state.folderId);
    }
  };

  private onBreadcrumbSelected(item: BasicCloudItem): void {
    const index: number = this.state.breadcrumb.indexOf(item);
    const newBreadcrumb: BasicCloudItem[] = this.state.breadcrumb.slice(0, index + 1);

    this.fetchItemsAndUpdateState({
      query: '',
      resetQuery: true,
      folderId: item.id,
      displayBreadcrumb: true,
      breadcrumb: newBreadcrumb,
      sortableColumnId: this.state.sortableColumnId,
      sortOrder: this.state.sortOrder,
      displaySpinner: this.state.displaySpinner,
      rows: this.state.rows
    });

    this.props.onFolderOpened(item.id);
  }

  private onColumnSelected(columnId: number): void {
    const sortOrder: SortOrder = this.getNextSortOrder(columnId);
    const rows: Row[] = ColumnUtilities.sortColumn(this.state.rows, columnId, sortOrder);

    this.setState({
      query: this.state.query,
      resetQuery: false,
      folderId: this.state.folderId,
      displayBreadcrumb: this.state.displayBreadcrumb,
      breadcrumb: this.state.breadcrumb,
      sortableColumnId: columnId,
      sortOrder: sortOrder,
      displaySpinner: this.state.displaySpinner,
      rows: rows
    });
  }

  private onItemSelected(item: CloudItem): void {
    if (this.state.query === '') {
      const newBreadcrumb: BasicCloudItem[] = item.path.slice();
      newBreadcrumb.push(createBasicCloudItem(item));
      newBreadcrumb[0].name = this.props.providerInfo.getProviderName();

      this.setState({
        query: this.state.query,
        resetQuery: false,
        folderId: this.state.folderId,
        displayBreadcrumb: true,
        breadcrumb: newBreadcrumb,
        sortableColumnId: this.state.sortableColumnId,
        sortOrder: this.state.sortOrder,
        displaySpinner: this.state.displaySpinner,
        rows: this.state.rows
      });
    }

    this.props.onItemSelected(item);
  }

  private onFolderOpened(item: CloudItem): void {
    const newBreadcrumb: BasicCloudItem[] = item.path.slice();
    newBreadcrumb.push(createBasicCloudItem(item));
    newBreadcrumb[0].name = this.props.providerInfo.getProviderName();

    this.fetchItemsAndUpdateState({
      query: '',
      resetQuery: true,
      folderId: item.id,
      displayBreadcrumb: true,
      breadcrumb: newBreadcrumb,
      sortableColumnId: this.state.sortableColumnId,
      sortOrder: this.state.sortOrder,
      displaySpinner: this.state.displaySpinner,
      rows: this.state.rows
    });

    this.props.onFolderOpened(item.id);
  }

  private setDisplaySpinnerState(): void {
    this.setState({
      query: this.state.query,
      resetQuery: false,
      folderId: this.state.folderId,
      displayBreadcrumb: this.state.displayBreadcrumb,
      breadcrumb: this.state.breadcrumb,
      sortableColumnId: this.state.sortableColumnId,
      sortOrder: this.state.sortOrder,
      displaySpinner: true,
      rows: this.state.rows
    });
  }

  public render(): JSX.Element {
    return (
      <div>
        <div style={SearchBarStyle}>
          <SearchBar displayText={this.state.query}
            resetQuery={this.state.resetQuery}
            handleCancel={this.handleQueryCancel}
            handleEnter={this.handleQueryEnter}
            isSearchDisabled={this.props.requestor.isSearchDisabled}/>
        </div>
        <div style={SignedInUserWidgetStyle}>
          <SignedInUserWidget email={this.props.requestor.auth.userId} />
        </div>
        {this.getBreadCrumb()}
        {!this.state.displayBreadcrumb && this.state.rows.length === 0 && !this.state.displaySpinner ?
          <ErrorWidget errorMessage={this.getErrorMessage()} /> :
          <DataGrid rows={this.state.displaySpinner ? [] : this.state.rows}
            sortOrder={this.state.sortOrder}
            onColumnSelected={this.onColumnSelected}
            onItemSelected={this.onItemSelected}
            onFolderOpened={this.onFolderOpened}
            onConnect={this.props.onConnect}
            sortableColumnId={this.state.sortableColumnId} />
        }
        {this.state.displaySpinner ? <Spinner /> : undefined}
      </div>
    );
  }

}

export { FilterableDataGridProps, FilterableDataGridState, FilterableDataGrid }
