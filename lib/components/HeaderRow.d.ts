/// <reference types="react" />
import * as React from 'react';
import { SortOrder } from '../types/SortOrderTypes';
interface HeaderRowProps extends React.Props<void> {
    onColumnSelected: (columnId: number) => void;
    sortableColumnId: number;
    sortOrder: SortOrder;
}
declare class HeaderRow extends React.Component<HeaderRowProps, void> {
    render(): JSX.Element;
}
export { HeaderRowProps, HeaderRow };
