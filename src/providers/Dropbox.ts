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
import { DropboxRequestor } from '../requestors/DropboxRequestor';
import { Headers, Request } from '../types/ShimTypes';
import { ProviderInfo } from './ProviderInfo';

export class Dropbox extends ProviderInfo {
  private defaultFolder: string = '';
  private providerName: string = 'Dropbox';

  public constructDownloadRequest(item: CloudItem, requestor: DropboxRequestor): Request {
    const headers: Headers = {'Dropbox-API-Arg': '{"path": "' + item.id + '"}'};
    const request: Request = {'downloadURL': requestor.getDownloadUrl(),
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
