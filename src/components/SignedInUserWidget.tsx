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

import { InputLabelWidget } from 'shared-widgets';
import { InteractiveDomProps, InteractiveDomWrapper } from 'shared-widgets';
import { Messages } from '../codegen/Localize';
import { shim } from '../shim/Shim';
import { hoverStyle, signedInStyle, signOutStyle, signedInUserStyle } from '../styles/TextStyles';

interface SignedInUserWidgetProps extends React.Props<void> {
  email: string;
};

class SignedInUserWidget extends React.Component<SignedInUserWidgetProps, void> {

  public constructor(props: SignedInUserWidgetProps) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  private handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>): void {
    if (event.key === 'Enter') {
      shim.signOut();
    }
  }

  public render(): JSX.Element {
    const interactiveDomProps: InteractiveDomProps = {
      interactiveStyles: {
        hover: hoverStyle
      },
      pointerClick: () => shim.signOut()
    };

    const signedInProps = {
      label: Messages.signedInAs({user: this.props.email}),
      disabled: false,
      testId: 'signed-in-as'
    };

    const signOutLabel = Messages.signOut();
    const signOutId = 'sign_out';
    return (
      <section style={signedInUserStyle}>
        <InputLabelWidget style={signedInStyle} {...signedInProps}>{ signedInProps.label }</InputLabelWidget>
        <InteractiveDomWrapper { ...interactiveDomProps }>
          <span style={signOutStyle} data-tb-test-id={signOutId} tabIndex={0} onKeyDown={this.handleKeyDown}>{ signOutLabel }</span>
        </InteractiveDomWrapper>
      </section>
    );
  }

}

export { SignedInUserWidgetProps, SignedInUserWidget };
