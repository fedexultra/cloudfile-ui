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

import { CancelButton } from './CancelButton';
import { CancelButtonStyle } from '../styles/CancelButtonStyles';
import { CloudFileConnectorActionButtonRowStyle } from '../styles/CloudFileConnectorActionButtonRowStyles';
import { CloudFileConnectorStyle } from '../styles/CloudFileConnectorStyles';
import { CloudItem, CloudItemType, NullCloudItem } from '../types/CloudItemTypes';
import { ConnectButton } from './ConnectButton';
import { FileAttrs, Request } from '../types/ShimTypes';
import { FileTypeMap } from '../types/ShimTypes';
import { FilterableDataGrid } from './FilterableDataGrid';
import { FilterableDataGridStyle } from '../styles/FilterableDataGridStyles';
import { initializeCloudItemUtilities } from '../utils/CloudItemUtilities';
import { ProviderInfo } from '../providers/ProviderInfo';
import { Requestor } from '../requestors/Requestor';
import { shim } from '../shim/Shim';

interface ContainerProps extends React.Props<void> {
  providerInfo: ProviderInfo;
  requestor: Requestor;
  supportedFileTypes: FileTypeMap;
}

interface ContainerState {
  selectedItem: CloudItem;
  folder: string;
}

class Container extends React.Component<ContainerProps, ContainerState> {
  public constructor(props: ContainerProps) {
    super(props);

    // Initialize modules
    initializeCloudItemUtilities(this.props.supportedFileTypes);

    // Set the initial state
    // $TODO - TFSID: 593227 - Preselect the correct file for edit connection scenario
    this.state = {
      selectedItem: new NullCloudItem(),
      folder: this.props.providerInfo.getDefaultFolder()
    };

    // Function bindings
    this.updateSelectedItem = this.updateSelectedItem.bind(this);
    this.updateFolder = this.updateFolder.bind(this);
    this.connect = this.connect.bind(this);
  }

  private canConnect(): boolean {
    return this.state.selectedItem.type === CloudItemType.File;
  }

  private updateSelectedItem(item: CloudItem): void {
    this.setState({
      selectedItem: item,
      folder: this.state.folder
    });
  }

  private updateFolder(itemId: string): void {
    this.setState({
      selectedItem: new NullCloudItem(),
      folder: itemId
    });
  }

  public connect(): void {
    if (this.state.selectedItem.type !== CloudItemType.File || this.state.selectedItem.id === '') {
      throw new Error('Connect called without a valid file selected.');
    }

    const fileAttrs: FileAttrs = this.props.providerInfo.constructFileAttrs(this.state.selectedItem);
    const request: Request = this.props.providerInfo.constructDownloadRequest(this.state.selectedItem, this.props.requestor);

    shim.connect(fileAttrs, request);
  }

  public render(): JSX.Element {
    return (
      <div style={CloudFileConnectorStyle}>
        <div style={FilterableDataGridStyle}>
          <FilterableDataGrid providerInfo={this.props.providerInfo}
            requestor={this.props.requestor}
            onItemSelected={this.updateSelectedItem}
            onFolderOpened={this.updateFolder}
            onConnect={this.connect}
            key='data-grid' />
          <div style={CloudFileConnectorActionButtonRowStyle}>
            <div style={CancelButtonStyle}>
              <CancelButton />
            </div>
            <ConnectButton enabled={this.canConnect()} onClick={this.connect} />
          </div>
        </div>
      </div>
    );
  }

}

export { ContainerProps, ContainerState, Container }
