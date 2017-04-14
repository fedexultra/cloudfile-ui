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

import { CloudItem } from '../../src/types/CloudItemTypes';
import { ProviderInfo } from '../../src/providers/ProviderInfo';
import { Request } from '../../src/types/ShimTypes';
import { Requestor } from '../../src/requestors/Requestor';

export class MockProvider extends ProviderInfo {

  public constructDownloadRequest(item: CloudItem, requestor: Requestor): Request {
    const request: Request = {'downloadURL': requestor.getDownloadUrl(),
                              'downloadHeaders': {'MockHeader1': 'A', 'MockHeader2': 'B'}};
    return request;
  }

  public getDefaultFolder(): string {
      return 'MockDefaultFolder';
  }

  public getProviderName(): string {
      return 'MockProvider';
  }
  
}