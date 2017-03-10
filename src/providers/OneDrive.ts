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

import { CloudItem } from '../types/CloudItemTypes';
import { Headers, Request } from '../types/ShimTypes';
import { OneDriveRequestor } from '../requestors/OneDriveRequestor';
import { ProviderInfo } from './ProviderInfo';

export class OneDrive extends ProviderInfo {
  private defaultFolder: string = 'root';
  private providerName: string = 'OneDrive';

  public constructDownloadRequest(item: CloudItem, requestor: OneDriveRequestor): Request {
    const headers: Headers = {};
    const request: Request = {'downloadURL': requestor.getDownloadUrl(item.id),
                              'downloadHeaders': headers};
    return request;
  }

  public getDefaultFolder(): string {
    return this.defaultFolder;
  }

  public getProviderName(): string {
    return this.providerName;
  }

}
