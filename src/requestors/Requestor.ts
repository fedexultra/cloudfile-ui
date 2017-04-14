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
import { ProviderInfo } from '../providers/ProviderInfo';
import { shim } from '../shim/Shim';

export enum SearchType { URL, Text };

const maxRetry = 4;

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

  private retryableCode(statusCode: number): boolean {
    // Retry all 5xx responses and 401 responses (after refreshing)
    return (Math.floor(statusCode / 100) === 5) || (statusCode === 401);
  }

  protected sendRequest(url: string, httpRequest: Object, retryLeft: number = maxRetry): Promise<Response> {
    return fetch(url, httpRequest)
    .then((response) => {
      if (response.ok) {
        return response;
      } else if (this.retryableCode(response.status) && retryLeft > 0) {
        if (response.status === 401) {
          // Ask Tableau to retrieve a new access token and try once more
          this.auth.accessToken = shim.refreshAuth();
          return this.sendRequest(url, httpRequest, 0);
        } else {
          // Retry the request using exponential backoff
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve(this.sendRequest(url, httpRequest, --retryLeft));
            },         Math.pow(2, maxRetry - retryLeft) * 1000);
          });
        }
      } else {
        // Tell Tableau to display an error dialog
        const error: CloudFileError = {message: response.statusText, code: response.status, abort: false};
        shim.reportError(error);
        return Promise.reject(response.statusText);
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
