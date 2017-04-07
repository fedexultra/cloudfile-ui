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
import { Messages } from '../codegen/Localize';
import { SearchFieldWidget } from 'shared-widgets';
import { SpaceStyle } from '../styles/SpaceStyles';

interface SearchBarProps {
  displayText: string;
  resetQuery: boolean;
  handleCancel: () => void;
  handleEnter: (query: string) => void;
}

interface SearchBarState {
  query: string;
}

class SearchBar extends React.Component<SearchBarProps, SearchBarState> {

  public constructor(props: SearchBarProps) {
    super(props);
    this.state = {query: this.props.displayText};
  }

  public componentWillReceiveProps(nextProps: SearchBarProps): void {
    if (nextProps.resetQuery) {
      this.setState({query: nextProps.displayText});
    }
  }

  private handleChange(text: string): void {
    this.setState({query: text});
  }

  private handleCancelSearch(): void {
    this.setState({query: ''});
    this.props.handleCancel();
  }

  private handleEnter(): void {
    this.props.handleEnter(this.state.query);
  }

  public render(): JSX.Element {
    const searchFieldProps = {
      text: this.state.query,
      handleChange: (text: string) => this.handleChange(text),
      handleEnter: () => this.handleEnter(),
      placeholder: Messages.search(),
      containerStyle: SpaceStyle,
      testId: 'search-bar',
      handleCancelSearch: () => this.handleCancelSearch(),
    };

    return (
      <SearchFieldWidget {...searchFieldProps} />
    );
  }
}

export { SearchBarProps, SearchBarState, SearchBar };
