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
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ColumnUtilities = require("../utils/ColumnUtilities");
var React = require("react");
var CloudItemTypes_1 = require("../types/CloudItemTypes");
var Breadcrumb_1 = require("./Breadcrumb");
var BreadcrumbStyles_1 = require("../styles/BreadcrumbStyles");
var CloudItemUtilities_1 = require("../utils/CloudItemUtilities");
var DataGrid_1 = require("./DataGrid");
var ErrorWidget_1 = require("./ErrorWidget");
var Localize_1 = require("../codegen/Localize");
var Requestor_1 = require("../requestors/Requestor");
var SearchBar_1 = require("./SearchBar");
var SearchBarStyles_1 = require("../styles/SearchBarStyles");
var SignedInUserWidget_1 = require("./SignedInUserWidget");
var SignedInUserWidgetStyles_1 = require("../styles/SignedInUserWidgetStyles");
var SortOrderTypes_1 = require("../types/SortOrderTypes");
var SpaceStyles_1 = require("../styles/SpaceStyles");
var Spinner_1 = require("./Spinner");
;
var FilterableDataGrid = (function (_super) {
    __extends(FilterableDataGrid, _super);
    function FilterableDataGrid(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            query: '',
            resetQuery: true,
            folderId: _this.props.providerInfo.getDefaultFolder(),
            displayBreadcrumb: true,
            breadcrumb: [{ id: _this.props.providerInfo.getDefaultFolder(),
                    name: props.providerInfo.getProviderName(),
                    type: CloudItemTypes_1.CloudItemType.Folder }],
            sortableColumnId: 0,
            sortOrder: SortOrderTypes_1.SortOrder.ascending,
            displaySpinner: true,
            rows: []
        };
        _this.fetchItemsAndUpdateState = _this.fetchItemsAndUpdateState.bind(_this);
        _this.handleQueryCancel = _this.handleQueryCancel.bind(_this);
        _this.handleQueryEnter = _this.handleQueryEnter.bind(_this);
        _this.onBreadcrumbSelected = _this.onBreadcrumbSelected.bind(_this);
        _this.onColumnSelected = _this.onColumnSelected.bind(_this);
        _this.onFolderOpened = _this.onFolderOpened.bind(_this);
        _this.onItemSelected = _this.onItemSelected.bind(_this);
        _this.setDisplaySpinnerState = _this.setDisplaySpinnerState.bind(_this);
        return _this;
    }
    FilterableDataGrid.prototype.componentDidMount = function () {
        this.fetchItemsAndUpdateState(this.state);
    };
    FilterableDataGrid.prototype.fetchItemsAndUpdateState = function (nextState) {
        var _this = this;
        this.setDisplaySpinnerState();
        this.props.requestor.enumerateItems(nextState.folderId).then(function (items) {
            var rows = items.map(function (item) { return ({ cloudItem: item }); });
            rows = ColumnUtilities.sortColumn(rows, nextState.sortableColumnId, nextState.sortOrder);
            _this.setState({
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
    };
    FilterableDataGrid.prototype.getBreadCrumb = function () {
        if (this.state.displayBreadcrumb) {
            return React.createElement(Breadcrumb_1.Breadcrumb, { trail: this.state.breadcrumb, onItemSelected: this.onBreadcrumbSelected });
        }
        else {
            return (React.createElement("section", { style: SpaceStyles_1.SpaceStyle },
                React.createElement("span", { "data-tb-test-id": 'filterable-data-grid-search-results-message', style: BreadcrumbStyles_1.BreadcrumbTextStyle }, Localize_1.Messages.searchResultsMessage())));
        }
    };
    FilterableDataGrid.prototype.getErrorMessage = function () {
        if (Requestor_1.Requestor.searchUrlRegex.test(this.state.query)) {
            return Localize_1.Messages.urlErrorMessage();
        }
        else {
            return Localize_1.Messages.queryErrorMessage();
        }
    };
    // Flip sort order
    FilterableDataGrid.prototype.getNextSortOrder = function (columnId) {
        if (columnId === this.state.sortableColumnId) {
            // Alternate between ascending and descending order by calculating the "current
            // sort order" modulo "enum size"
            var sortOrderNumber = (this.state.sortOrder + 1) % SortOrderTypes_1.SortOrder.COUNT;
            return sortOrderNumber;
        }
        return SortOrderTypes_1.SortOrder.ascending;
    };
    FilterableDataGrid.prototype.handleQueryCancel = function () {
        var newBreadcrumb = this.state.breadcrumb;
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
    ;
    FilterableDataGrid.prototype.handleQueryEnter = function (query) {
        var _this = this;
        if (query === '') {
            this.handleQueryCancel();
        }
        else {
            this.setDisplaySpinnerState();
            this.props.requestor.search(query).then(function (items) {
                var rows = items.map(function (item) { return ({ cloudItem: item }); });
                rows = ColumnUtilities.sortColumn(rows, _this.state.sortableColumnId, _this.state.sortOrder);
                _this.setState({
                    query: query,
                    resetQuery: true,
                    folderId: _this.state.folderId,
                    displayBreadcrumb: false,
                    breadcrumb: _this.state.breadcrumb,
                    sortableColumnId: _this.state.sortableColumnId,
                    sortOrder: _this.state.sortOrder,
                    displaySpinner: false,
                    rows: rows
                });
            });
            this.props.onFolderOpened(this.state.folderId);
        }
    };
    ;
    FilterableDataGrid.prototype.onBreadcrumbSelected = function (item) {
        var index = this.state.breadcrumb.indexOf(item);
        var newBreadcrumb = this.state.breadcrumb.slice(0, index + 1);
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
    };
    FilterableDataGrid.prototype.onColumnSelected = function (columnId) {
        var sortOrder = this.getNextSortOrder(columnId);
        var rows = ColumnUtilities.sortColumn(this.state.rows, columnId, sortOrder);
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
    };
    FilterableDataGrid.prototype.onItemSelected = function (item) {
        if (this.state.query === '') {
            var newBreadcrumb = item.path.slice();
            newBreadcrumb.push(CloudItemUtilities_1.createBasicCloudItem(item));
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
    };
    FilterableDataGrid.prototype.onFolderOpened = function (item) {
        var newBreadcrumb = item.path.slice();
        newBreadcrumb.push(CloudItemUtilities_1.createBasicCloudItem(item));
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
    };
    FilterableDataGrid.prototype.setDisplaySpinnerState = function () {
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
    };
    FilterableDataGrid.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("div", { style: SearchBarStyles_1.SearchBarStyle },
                React.createElement(SearchBar_1.SearchBar, { displayText: this.state.query, resetQuery: this.state.resetQuery, handleCancel: this.handleQueryCancel, handleEnter: this.handleQueryEnter })),
            React.createElement("div", { style: SignedInUserWidgetStyles_1.SignedInUserWidgetStyle },
                React.createElement(SignedInUserWidget_1.SignedInUserWidget, { email: this.props.requestor.auth.userId })),
            this.getBreadCrumb(),
            !this.state.displayBreadcrumb && this.state.rows.length === 0 && !this.state.displaySpinner ?
                React.createElement(ErrorWidget_1.ErrorWidget, { errorMessage: this.getErrorMessage() }) :
                React.createElement(DataGrid_1.DataGrid, { rows: this.state.displaySpinner ? [] : this.state.rows, sortOrder: this.state.sortOrder, onColumnSelected: this.onColumnSelected, onItemSelected: this.onItemSelected, onFolderOpened: this.onFolderOpened, onConnect: this.props.onConnect, sortableColumnId: this.state.sortableColumnId }),
            this.state.displaySpinner ? React.createElement(Spinner_1.Spinner, null) : undefined));
    };
    return FilterableDataGrid;
}(React.Component));
exports.FilterableDataGrid = FilterableDataGrid;
//# sourceMappingURL=FilterableDataGrid.js.map