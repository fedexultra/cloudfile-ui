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

import * as _ from 'lodash';
import * as React from 'react';

import { BasicCloudItem } from '../types/CloudItemTypes';
import { BreadcrumbItem } from './BreadcrumbItem';
import { BREADCRUMB_ITEM_WIDTH, BreadcrumbSpaceStyle } from '../styles/BreadcrumbStyles';
import { CloudItemType } from '../types/CloudItemTypes';

/* Basic set of rules that the breadcrumb component should adhere to (refer to TFSID: 599608 for full details):
   1. The breadcrumb trail always stays on the same line.
   2. The root folder is always shown and clickable.
   3. The current folder is always shown clickable.
   4. When a file is selected, it is shown in the breadcrumb.
   5. When the breadcrumb trail does not fit into the width of the dialog, we begin to truncate folders,
      starting with the leftmost folder aside from the root.
*/

interface BreadcrumbProps extends React.Props<void> {
  trail: BasicCloudItem[];
  onItemSelected: (item: BasicCloudItem) => void;
};

interface BreadcrumbState {
  width: number;
};

class Breadcrumb extends React.Component<BreadcrumbProps, BreadcrumbState> {
  private breadcrumbNode: HTMLElement;
  private mounted: boolean;

  public constructor(props: BreadcrumbProps) {
    super(props);
    this.mounted = false;
    this.state = {width: 0};
    this.getTrail = this.getTrail.bind(this);
    this.handleWindowResize = _.throttle(this.handleWindowResize.bind(this), 100);
  }

  private createBreadcrumbItem(item: BasicCloudItem, trailIndex: number): JSX.Element {
    return <BreadcrumbItem
      displayArrow={(trailIndex === this.props.trail.length - 1) ? false : true}
      item={item}
      onItemSelected={this.props.onItemSelected}
      key={trailIndex} />;
  }

  private getTrail(): JSX.Element[] {
    const breadcrumbItemsMaxCount = Math.floor(this.state.width / BREADCRUMB_ITEM_WIDTH);
    if (breadcrumbItemsMaxCount >= this.props.trail.length || this.state.width === 0 /* initial render */) {
      const breadcrumbTrail = this.props.trail.map((item, i) => {
        return this.createBreadcrumbItem(item, i);
      });
      return breadcrumbTrail;
    } else {
      let breadcrumbTrail: JSX.Element[] = [];
      breadcrumbTrail.push(this.createBreadcrumbItem(this.props.trail[0], 0));
      const ellipsisItem: BasicCloudItem = {id: 'none', name: '...', type: CloudItemType.Unknown};
      breadcrumbTrail.push(this.createBreadcrumbItem(ellipsisItem, 1));
      for (let i = 2; i < this.props.trail.length; i++ ) {
        if (i > (this.props.trail.length - breadcrumbItemsMaxCount)) {
          breadcrumbTrail.push(this.createBreadcrumbItem(this.props.trail[i], i));
        } else {
          continue;
        }
      }
      return breadcrumbTrail;
    }
  }

  private handleWindowResize(): void {
    // We need to check if the component is mounted because it is possible that it
    // gets unmounted when this function is called since we throttle function calls.
    if (this.mounted) {
      this.setState({
        width: this.breadcrumbNode.offsetWidth
      });
    }
  }

  public componentDidMount(): void {
    this.mounted = true;
    this.setState({
      width: this.breadcrumbNode.offsetWidth
    });
    window.addEventListener('resize', this.handleWindowResize);
  }

  public componentWillUnmount(): void {
    this.mounted = false;
    window.removeEventListener('resize', this.handleWindowResize);
  }

  public setBreadcrumbNode(node: HTMLSpanElement): void {
    if (node !== null) {
      this.breadcrumbNode = node;
    }
  }

  public render(): JSX.Element {
    return (
      <span style={BreadcrumbSpaceStyle} ref={node => this.setBreadcrumbNode(node)}>
        { this.getTrail() }
      </span>
    );
  }

}

export { BreadcrumbProps, BreadcrumbState, Breadcrumb };
