/// <reference types="react" />
import * as React from 'react';
import { Column } from '../types/DataGridTypes';
import { IconDefinition } from '../types/IconTypes';
interface HeaderCellProps extends React.Props<void> {
    column: Column;
    icon?: IconDefinition;
    onColumnSelected: (columnId: number) => void;
}
declare class HeaderCell extends React.Component<HeaderCellProps, void> {
    constructor(props: HeaderCellProps);
    private onClick();
    render(): JSX.Element;
}
export { HeaderCellProps, HeaderCell };
