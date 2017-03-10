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
var React = require("react");
var CancelButton_1 = require("./CancelButton");
var CancelButtonStyles_1 = require("../styles/CancelButtonStyles");
var CloudFileConnectorActionButtonRowStyles_1 = require("../styles/CloudFileConnectorActionButtonRowStyles");
var CloudFileConnectorStyles_1 = require("../styles/CloudFileConnectorStyles");
var CloudItemTypes_1 = require("../types/CloudItemTypes");
var ConnectButton_1 = require("./ConnectButton");
var FilterableDataGrid_1 = require("./FilterableDataGrid");
var FilterableDataGridStyles_1 = require("../styles/FilterableDataGridStyles");
var CloudItemUtilities_1 = require("../utils/CloudItemUtilities");
var Shim_1 = require("../shim/Shim");
var Container = (function (_super) {
    __extends(Container, _super);
    function Container(props) {
        var _this = _super.call(this, props) || this;
        // Initialize modules
        CloudItemUtilities_1.initializeCloudItemUtilities(_this.props.supportedFileTypes);
        // Set the initial state
        // $TODO - TFSID: 593227 - Preselect the correct file for edit connection scenario
        _this.state = {
            selectedItem: new CloudItemTypes_1.NullCloudItem(),
            folder: _this.props.providerInfo.getDefaultFolder()
        };
        // Function bindings
        _this.updateSelectedItem = _this.updateSelectedItem.bind(_this);
        _this.updateFolder = _this.updateFolder.bind(_this);
        _this.connect = _this.connect.bind(_this);
        return _this;
    }
    Container.prototype.canConnect = function () {
        return this.state.selectedItem.type === CloudItemTypes_1.CloudItemType.File;
    };
    Container.prototype.updateSelectedItem = function (item) {
        this.setState({
            selectedItem: item,
            folder: this.state.folder
        });
    };
    Container.prototype.updateFolder = function (itemId) {
        this.setState({
            selectedItem: new CloudItemTypes_1.NullCloudItem(),
            folder: itemId
        });
    };
    Container.prototype.connect = function () {
        if (this.state.selectedItem.type !== CloudItemTypes_1.CloudItemType.File || this.state.selectedItem.id === '') {
            throw new Error('Connect called without a valid file selected.');
        }
        var fileAttrs = this.props.providerInfo.constructFileAttrs(this.state.selectedItem);
        var request = this.props.providerInfo.constructDownloadRequest(this.state.selectedItem, this.props.requestor);
        Shim_1.shim.connect(fileAttrs, request);
    };
    Container.prototype.render = function () {
        return (React.createElement("div", { style: CloudFileConnectorStyles_1.CloudFileConnectorStyle },
            React.createElement("div", { style: FilterableDataGridStyles_1.FilterableDataGridStyle },
                React.createElement(FilterableDataGrid_1.FilterableDataGrid, { providerInfo: this.props.providerInfo, requestor: this.props.requestor, onItemSelected: this.updateSelectedItem, onFolderOpened: this.updateFolder, onConnect: this.connect, key: 'data-grid' }),
                React.createElement("div", { style: CloudFileConnectorActionButtonRowStyles_1.CloudFileConnectorActionButtonRowStyle },
                    React.createElement("div", { style: CancelButtonStyles_1.CancelButtonStyle },
                        React.createElement(CancelButton_1.CancelButton, null)),
                    React.createElement(ConnectButton_1.ConnectButton, { enabled: this.canConnect(), onClick: this.connect })))));
    };
    return Container;
}(React.Component));
exports.Container = Container;
//# sourceMappingURL=Container.js.map