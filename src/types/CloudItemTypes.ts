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
import { EmptyIcon } from '../icons/Icons';
import { IconDefinition } from '../types/IconTypes';

export enum CloudItemType { File, Folder, Unknown }

// The subset of properties we put into the "path" property of a CloudItem.
export interface BasicCloudItem {
  id: string;
  name: string;
  type: CloudItemType;
}

export interface CloudItem {
  canBeSelected: boolean;
  displayAsEnabled: boolean;
  displayKind: string;
  extension: string;
  icon: IconDefinition;
  id: string;
  modifiedAt: Date;
  name: string;
  path: BasicCloudItem[];
  type: CloudItemType;
}

export class NullCloudItem implements CloudItem {
  public canBeSelected: boolean;
  public displayAsEnabled: boolean;
  public displayKind: string;
  public extension: string;
  public icon: IconDefinition;
  public id: string;
  public modifiedAt: Date;
  public name: string;
  public path: BasicCloudItem[];
  public type: CloudItemType;

  public constructor() {
    this.canBeSelected = false;
    this.displayAsEnabled = false;
    this.displayKind = '';
    this.extension = '';
    this.icon = EmptyIcon;
    this.id = '';
    this.modifiedAt = new Date(0);
    this.name = '';
    this.path = [];
    this.type = CloudItemType.Unknown;
  }
}
