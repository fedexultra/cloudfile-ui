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
import { SpinnerStyle } from '../styles/SpinnerStyles';

class Spinner extends React.Component<void, void> {
  public render(): JSX.Element {
    return (
      <div style={SpinnerStyle} />
    );
  }
}

export { Spinner };
