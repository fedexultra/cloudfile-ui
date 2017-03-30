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

interface IconProps extends React.Props<void> {
  source: string;
  style: React.CSSProperties;
}

class Icon extends React.Component<IconProps, void> {
  public render(): JSX.Element {
    if (!this.props.source) {
      return <div/>;
    }

    return (
      <img src={this.props.source} style={this.props.style} />
    );
  }
}

export { IconProps, Icon };
