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

import { BoxRequestor } from '../requestors/BoxRequestor';
import { CloudItem } from '../types/CloudItemTypes';
import { Headers, Request } from '../types/ShimTypes';
import { ProviderInfo } from './ProviderInfo';

export class Box extends ProviderInfo {
  private defaultFolder: string = '0';
  private providerName: string = 'Box';

  public constructDownloadRequest(item: CloudItem, requestor: BoxRequestor): Request {
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
