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
import * as BreadcrumbStyles from '../styles/BreadcrumbStyles';

import { BasicCloudItem, CloudItemType } from '../types/CloudItemTypes';
import { InteractiveDomProps, InteractiveDomWrapper } from 'shared-widgets';

interface BreadcrumbItemProps extends React.Props<void> {
  displayArrow: boolean;
  item: BasicCloudItem;
  onItemSelected: (item: BasicCloudItem) => void;
};

class BreadcrumbItem extends React.Component<BreadcrumbItemProps, void> {

  public constructor(props: BreadcrumbItemProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  private handleClick(): void {
    this.props.onItemSelected(this.props.item);
  }

  public render(): JSX.Element {
    const itemName = this.props.item.name;

    const interactiveDomProps: InteractiveDomProps = {
      interactiveStyles: {
        hover: BreadcrumbStyles.HoverFolderStyle
      },
      pointerClick: this.handleClick
    };

    if (this.props.item.type === CloudItemType.Folder) {
      return (
        <span style={BreadcrumbStyles.BreadcrumbStyle}>
          <InteractiveDomWrapper { ...interactiveDomProps }>
            <span style={BreadcrumbStyles.ElidedFolderStyle}>{ itemName }</span>
          </InteractiveDomWrapper>
          {this.props.displayArrow ? <span style={BreadcrumbStyles.BreadcrumbTextStyle}> {' > '} </span> : undefined}
        </span>
      );
    } else { // item is a file
      return (
        <span>
          <span style={BreadcrumbStyles.BreadcrumbElidedTextStyle}>{ itemName }</span>
          {this.props.displayArrow ? <span style={BreadcrumbStyles.BreadcrumbTextStyle}> {' > '} </span> : undefined}
        </span>
      );
    }

  }

}

export { BreadcrumbItemProps, BreadcrumbItem };
