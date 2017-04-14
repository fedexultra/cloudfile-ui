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

// This function is used to fully resolve a MockPromise corresponding to an enumerateItems
// or search call on a requestor via FilterableDataGrid.doRequest
export function executeRequestorPromises(promise: Promise<CloudItem[]>): void {
  // Resolve the promise for the catch clause
  MockPromises.executeForPromise(promise);
  // Resolve the promise for the then clause
  MockPromises.iterateForPromise(promise);
  // This function isn't documented at all on the web, but it is necessary in
  // case we reuse a mock promise within a single unit test -- i.e. if doRequest
  // gets called multiple times
  MockPromises.executeForResolvedPromises();
}