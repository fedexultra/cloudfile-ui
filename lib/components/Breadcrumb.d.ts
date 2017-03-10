/// <reference types="react" />
import * as React from 'react';
import { BasicCloudItem } from '../types/CloudItemTypes';
interface BreadcrumbProps extends React.Props<void> {
    trail: BasicCloudItem[];
    onItemSelected: (item: BasicCloudItem) => void;
}
interface BreadcrumbState {
    width: number;
}
declare class Breadcrumb extends React.Component<BreadcrumbProps, BreadcrumbState> {
    private breadcrumbNode;
    private mounted;
    constructor(props: BreadcrumbProps);
    private createBreadcrumbItem(item, trailIndex);
    private getTrail();
    private handleWindowResize();
    componentDidMount(): void;
    componentWillUnmount(): void;
    setBreadcrumbNode(node: HTMLSpanElement): void;
    render(): JSX.Element;
}
export { BreadcrumbProps, BreadcrumbState, Breadcrumb };
