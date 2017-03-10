/// <reference types="react" />
import * as React from 'react';
import { IconDefinition } from '../types/IconTypes';
interface BodyCellProps extends React.Props<void> {
    value: string;
    width: string;
    hasBorder: boolean;
    icon: IconDefinition;
    testValueUniqueCellId: string;
    handleFolderTextClicked: () => void;
}
declare class BodyCell extends React.Component<BodyCellProps, void> {
    constructor(props: BodyCellProps);
    private getValue();
    private handleClick(event);
    render(): JSX.Element;
}
export { BodyCellProps, BodyCell };
