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
import { shim } from '../shim/Shim';

class CancelButton extends React.Component<void, void> {

  public render(): JSX.Element {
    const buttonProps = {
      buttonType: ButtonType.Outline,
      handleClick: () => { shim.cancel(); },
      label: Messages.cancel(),
      testId: 'cancel'
    };

    return (
      <ButtonWidget {...buttonProps} />
    );
  }
}

export { CancelButton };
