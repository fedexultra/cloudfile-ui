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

import * as MockPromises from 'mock-promises';

import { CloudItem } from '../../src/types/CloudItemTypes';
import { Requestor } from '../../src/requestors/Requestor';

export class MockRequestor extends Requestor {

  public enumerateItems(folder: string): Promise<CloudItem[]> {
    return MockPromises.getMockPromise(Promise).resolve([]);
  }

  public getDownloadUrl(fileID?: string): string {
    return 'MockDownloadURL';
  }

  public search(query: string): Promise<CloudItem[]> {
    return MockPromises.getMockPromise(Promise).resolve([]);
  }

}