/// <reference types="react" />
import * as React from 'react';
interface SearchBarProps {
    displayText: string;
    resetQuery: boolean;
    handleCancel: () => void;
    handleEnter: (query: string) => void;
}
interface SearchBarState {
    query: string;
}
declare class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
    constructor(props: SearchBarProps);
    componentWillReceiveProps(nextProps: SearchBarProps): void;
    private handleChange(text);
    private handleCancelSearch();
    private handleEnter();
    render(): JSX.Element;
}
export { SearchBarProps, SearchBarState, SearchBar };
