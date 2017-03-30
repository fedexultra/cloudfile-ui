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
import { errorMessageStyle } from '../styles/TextStyles';
import { ErrorStyle } from '../styles/ErrorStyles';

interface ErrorWidgetProps extends React.Props<void> {
  errorMessage: string;
};

class ErrorWidget extends React.Component<ErrorWidgetProps, void> {

  public render(): JSX.Element {
    const errorWidgetId = 'error_widget';
    return (
      <div style={ErrorStyle}>
          <span style={errorMessageStyle} data-tb-test-id={errorWidgetId}>{this.props.errorMessage}</span>
      </div>
    );
  };
}

export { ErrorWidgetProps, ErrorWidget }
