/// <reference types="react" />
import * as React from 'react';
import { BasicCloudItem } from '../types/CloudItemTypes';
interface BreadcrumbItemProps extends React.Props<void> {
    displayArrow: boolean;
    item: BasicCloudItem;
    onItemSelected: (item: BasicCloudItem) => void;
}
declare class BreadcrumbItem extends React.Component<BreadcrumbItemProps, void> {
    constructor(props: BreadcrumbItemProps);
    private handleClick();
    render(): JSX.Element;
}
export { BreadcrumbItemProps, BreadcrumbItem };
