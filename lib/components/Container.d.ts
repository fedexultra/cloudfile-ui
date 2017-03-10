/// <reference types="react" />
import * as React from 'react';
import { CloudItem } from '../types/CloudItemTypes';
import { FileTypeMap } from '../types/ShimTypes';
import { ProviderInfo } from '../providers/ProviderInfo';
import { Requestor } from '../requestors/Requestor';
interface ContainerProps extends React.Props<void> {
    providerInfo: ProviderInfo;
    requestor: Requestor;
    supportedFileTypes: FileTypeMap;
}
interface ContainerState {
    selectedItem: CloudItem;
    folder: string;
}
declare class Container extends React.Component<ContainerProps, ContainerState> {
    constructor(props: ContainerProps);
    private canConnect();
    private updateSelectedItem(item);
    private updateFolder(itemId);
    connect(): void;
    render(): JSX.Element;
}
export { ContainerProps, ContainerState, Container };
