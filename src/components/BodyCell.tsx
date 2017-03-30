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
import { assign, TabStyles } from 'shared-widgets';
import { cellStyle } from '../styles/TableStyles';
import { DataGridRowIconStyle } from '../styles/IconStyles';
import { FolderIcon } from '../icons/Icons';
import { hoverStyle } from '../styles/TextStyles';
import { Icon } from '../components/Icon';
import { IconDefinition } from '../types/IconTypes';
import { InteractiveDomProps, InteractiveDomWrapper } from 'shared-widgets';

const { Colors, Sizing } = TabStyles;

interface BodyCellProps extends React.Props<void> {
  value: string;
  width: string;
  hasBorder: boolean;
  icon: IconDefinition;
  // This value is used to uniquely identify cells, which helps with automation.
  testValueUniqueCellId: string;
  handleFolderTextClicked: () => void;
};

class BodyCell extends React.Component<BodyCellProps, void> {
  public constructor(props: BodyCellProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  private getValue(): JSX.Element {
    if (this.props.icon === FolderIcon) {
      // We do not set the pointer prop to call handleClick in InteractiveDomProps because the shared-widgets
      // library uses an older version of react that does not have generic types whereas our project has a
      // later version with generic types. When the shared-widgets library changes from typings to @types/react
      // (TFSID 613276), we should move the handleClick function back to InteractiveDomProps
      const interactiveDomProps: InteractiveDomProps = {
        interactiveStyles: {
          hover: hoverStyle
        },
      };
      return (
        <InteractiveDomWrapper { ...interactiveDomProps }>
          <span className='data-grid-body-cell-value'
                onClick={this.handleClick}
                data-tb-test-id={ this.props.testValueUniqueCellId }>
                { this.props.value }
          </span>
        </InteractiveDomWrapper>
      );
    } else {
      return <span className='data-grid-body-cell-value' data-tb-test-id={ this.props.testValueUniqueCellId }>{ this.props.value }</span>;
    }
  }

  private handleClick(event: React.MouseEvent<HTMLDivElement>): void {
    event.stopPropagation();
    this.props.handleFolderTextClicked();
  }

  public render(): JSX.Element {
    const perCellStyle: React.CSSProperties = assign({}, cellStyle, {
      width: this.props.width,
      borderLeft: this.props.hasBorder ? `${Sizing && Sizing.BorderWidth}px solid` : 0,
      borderRight: this.props.hasBorder ? `${Sizing && Sizing.BorderWidth}px solid` : 0,
      borderLeftColor: Colors && Colors.L2,
      borderRightColor: Colors && Colors.L2,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      verticalAlign: 'middle'
    });

    return (
      <div className='data-grid-body-cell' style={perCellStyle}>
        <Icon source={ this.props.icon.source } style={DataGridRowIconStyle} />
        {this.getValue()}
      </div>
    );
  }

}

export { BodyCellProps, BodyCell };
