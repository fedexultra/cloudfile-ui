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
import { ButtonType, ButtonWidget } from 'shared-widgets';
import { Messages } from '../codegen/Localize';

interface ConnectButtonProps extends React.Props<void> {
  enabled: boolean;
  onClick: () => void;
}

class ConnectButton extends React.Component<ConnectButtonProps, void> {

  public render(): JSX.Element {
    const buttonProps = {
      buttonType: ButtonType.Go,
      disabled: !this.props.enabled,
      handleClick: () => {
        this.props.onClick();
      },
      label: Messages.connect(),
      testId: 'connect'
    };

    return (
      <ButtonWidget {...buttonProps} />
    );
  }

}

export { ConnectButtonProps, ConnectButton };
