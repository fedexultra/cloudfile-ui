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

import { AuthInfo, CloudFileError } from '../types/ShimTypes';
import { CloudItem } from '../types/CloudItemTypes';
import { log } from '../utils/Logger';
import { ProviderInfo } from '../providers/ProviderInfo';
import { shim } from '../shim/Shim';

export enum SearchType { URL, Text };

abstract class Requestor {
  public auth: AuthInfo;
  public providerInfo: ProviderInfo;
  public static searchUrlRegex: RegExp = new RegExp(
    '(https?:\/\/www\.[^\s]+\.[^\s]{2,}|https?:\/\/.+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})');

  public constructor(auth: AuthInfo, providerInfo: ProviderInfo) {
    this.auth = auth;
    this.providerInfo = providerInfo;

    this.enumerateItems = this.enumerateItems.bind(this);
    this.getDownloadUrl = this.getDownloadUrl.bind(this);
    this.search = this.search.bind(this);
  }

  private sendRequest(url: string, httpRequest: Object): Promise<Response> {
    return fetch(url, httpRequest);
  }

  protected sendRequestWithRetry(url: string, httpRequest: Object): Promise<Response> {
    return this.sendRequest(url, httpRequest)
    .catch((error) => {
      log('The sendRequest promise was rejected with message "' + error + '". Calling the refreshAuth method.');
      // When debugging in the browser, 401 errors cause the promise to be rejected,
      // seemingly because of a CORS issue. So, we optimistically assume that
      // that is why the promise was rejected and proceed to do a refresh.
    })
    .then((response) => {
      if (!response || response.status === 401) {
        /*if (!!response && response.status == 401) {
          shim.reportError({message: 'Goood', code: 500, abort: true});
          return response;
        }*/
        // If a new access token cannot be retrieved, the shim does not return
        this.auth.accessToken = shim.refreshAuth();
        return this.sendRequest(url, httpRequest);
      } else if (!response.ok) {
        const error: CloudFileError = {message: response.statusText, code: response.status, abort: false};
        shim.reportError(error);
        return Promise.reject(response.statusText);
      } else {
        return response;
      }
    });
  }

  protected getSearchType(searchText: string): SearchType {
    if (Requestor.searchUrlRegex.test(searchText)) {
      return SearchType.URL;
    } else {
      return SearchType.Text;
    }
  }

  public abstract enumerateItems(folder: string): Promise<CloudItem[]>;

  public abstract getDownloadUrl(fileID?: string): string;

  public abstract search(query: string): Promise<CloudItem[]>;
}

export { Requestor };
