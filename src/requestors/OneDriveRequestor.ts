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

import 'isomorphic-fetch';

import { AuthInfo } from '../types/ShimTypes';
import { BasicCloudItem, CloudItem, CloudItemType } from '../types/CloudItemTypes';
import { createCloudItem, determineExtension } from '../utils/CloudItemUtilities';
import { ProviderInfo } from '../providers/ProviderInfo';
import { Requestor } from './Requestor';

enum SearchType { URL, Text };

interface OneDrivePath {
  path: string;
}

interface OneDriveItem {
  name: string;
  file?: Object; // Only defined if item is a file
  folder?: Object; // Only defined if item is a folder
  lastModifiedDateTime: string;
  parentReference: OneDrivePath; // Path of cloud item. Used for cloud item id and breadcrumb
}

interface OneDriveResponse {
  /* We duplicate the OneDriveItem contents into OneDriveResponse because OneDrive can either return an
   * array called value that contains OneDriveItems or it can return a single OneDriveItem.
  */
  name: string;
  file?: Object; // Only defined if item is a file
  folder?: Object; // Only defined if item is a folder
  lastModifiedDateTime: string;
  parentReference: OneDrivePath; // Path of cloud item. Used for cloud item id and breadcrumb
  value: OneDriveItem[];
};

class OneDriveRequestor extends Requestor {
  private baseUrl: string;

  public constructor(auth: AuthInfo, providerInfo: ProviderInfo) {
    super(auth, providerInfo);
    this.baseUrl = 'https://graph.microsoft.com/v1.0/me';
  }

  private sendOneDriveRequest(url: string): Promise<Response> {
    return this.sendRequestWithRetry(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + this.auth.accessToken,
        'Content-Type': 'application/json'
      }
    });
  }

  private getOneDriveItems(url: string): Promise<OneDriveResponse> {
    return this.sendOneDriveRequest(url).then(response => <Promise<OneDriveResponse>> response.json());
  }

  private determineCloudItemType(item: OneDriveItem): CloudItemType {
    if (typeof (item.folder) !== 'undefined') {
      return CloudItemType.Folder;
    } else if (typeof (item.file) !== 'undefined') {
      return CloudItemType.File;
    } else {
      return CloudItemType.Unknown;
    }
  }

  private getPath(pathReference: OneDrivePath): BasicCloudItem[] {
    // pathReference.path is returned as /drive/root:/<cloud_item_path>/<cloud_item>
    // pathArray is created as ["", "drive", "root:", <names_of_the_rest>]
    const pathArray: string[] = pathReference.path.split('/');
    let path: BasicCloudItem[] = [];
    for (let i = 0; i < pathArray.length; i++) {
      if (i === 0 && decodeURIComponent(pathArray[i]) === '') {
        path.push({
          id: this.providerInfo.getDefaultFolder(),
          name: this.providerInfo.getProviderName(),
          type: CloudItemType.Folder
        });
      } else if ((i === 1 && decodeURIComponent(pathArray[i]) === 'drive') ||
        (i === 2 && decodeURIComponent(pathArray[i]) === 'root:')) {
        continue;
      } else {
        path.push({
          id: pathReference.path,
          name: decodeURIComponent(pathArray[i]),
          type: CloudItemType.Folder
        });
      }
    }
    // We want path returned as [<root_folder>, <rest_of_the_items>]
    return path;
  }

  public enumerateItems(folderID: string = ''): Promise<CloudItem[]> {
    let urlRequest = '';
    if (folderID === this.providerInfo.getDefaultFolder()) {
      // GET https://graph.microsoft.com/v1.0/me/drive/root/children
      urlRequest = this.baseUrl + '/drive/root/children';
    } else {
      // GET https://graph.microsoft.com/v1.0/me/drive/root:/{item-path}:/children
      urlRequest = this.baseUrl + folderID + ':/children';
    }
    return this.getOneDriveItems(urlRequest).then(response => {
      const items: CloudItem[] = response.value.map((entry: OneDriveItem) => {
        return this.constructCloudItem(entry);
      });
      return items;
    });
  }

  public getDownloadUrl(fileID: string): string {
    // GET https://graph.microsoft.com/v1.0/me/drive/root:/{item-path}:/content
    return this.baseUrl + fileID + ':/content';
  }

  private validateURL(url: string): [boolean, string | undefined] {
    /* Returns true and the resid if url:
     * Contains a 'cid' AND contains a 'resid'
     * Returns false otherwise.
    */

    // Check if the url has resid and cid. indexOf returns -1 if it can't find the substring in the string.
    if (url.indexOf('resid') === -1 && url.indexOf('cid') === -1) {
      return [false, undefined];
    }
    // This gets the url parameters.
    const urlBits = url.split('?')[1];

    // Split the parameters.
    const urlQueryParameters = urlBits.split('&');

    /* At this point, we know for sure that we have a resid and a cid somewhere in the url parameters.
     * We want to get their index so we can split on the '=' sign afterwards. We init the index to -1,
     * to mark it as unset. Then, we loop through urlQueryParameters making sure we don't do duplicate work.
    */
    let residIndex: number = -1;
    let cidIndex: number = -1;
    /* We use an iterative for loop instead of a for-in loop because a for-in loop is meant to enumerate
     * an object's properties.
    */
    for (let parameterIndex = 0; parameterIndex < urlQueryParameters.length; parameterIndex++) {
      if (residIndex === -1) {
        residIndex = urlQueryParameters[parameterIndex].indexOf('resid');
      }
      if (cidIndex === -1) {
        cidIndex = urlQueryParameters[parameterIndex].indexOf('cid');
      }
      if (residIndex !== -1 && cidIndex !== -1) {
        break;
      }
    }

    // Get the file id from the residIndex we got in the previous step
    // resid=ABCDEFGHIJKLMNOPQRST
    const fileID = urlQueryParameters[residIndex].split('=')[1];

    // We have validated the url and have gotten the fileID
    return [true, fileID];
  }
  private buildSearchRequest(searchText: string, typeOfSearch: SearchType): string {
    // This tries to determine if the searchText entered is a file url for OneDrive

    if (typeOfSearch === SearchType.URL && this.validateURL(searchText)[0] === true) {
      const searchTextBits = searchText.split('&');
      const fileId = searchTextBits[2].split('=')[1];
      return this.baseUrl + '/drive/items/' + fileId;
    }
    return this.baseUrl + '/drive/root/search(q=\'{' + encodeURIComponent(searchText) + '}\')';
  }

  private isSearchTextOrUrl(searchText: string): SearchType {
    if (Requestor.searchUrlRegex.test(searchText)) {
      return SearchType.URL;
    } else {
      return SearchType.Text;
    }
  }
  private constructCloudItem(oneDriveItem: OneDriveItem): CloudItem {
    // This is a helper method for getting the correct data bits to create a cloud item.
    const type = this.determineCloudItemType(oneDriveItem);
    return createCloudItem(
      oneDriveItem.parentReference.path + '/' + oneDriveItem.name, // id is its path
      type,
      oneDriveItem.name,
      determineExtension(type, oneDriveItem.name),
      new Date(oneDriveItem.lastModifiedDateTime),
      this.getPath(oneDriveItem.parentReference)
    );
  }
  public search(query: string): Promise<CloudItem[]> {
    // GET https://graph.microsoft.com/v1.0/me/drive/root/search(q='{<SEARCH_TEXT>}')
    // GET https://graph.microsoft.com/v1.0/me/drive/items/<FILE_ID>
    const typeOfSearch = this.isSearchTextOrUrl(query);
    const urlRequest = this.buildSearchRequest(query, typeOfSearch);
    return this.getOneDriveItems(urlRequest).then((response) => {
      /* The response for a search returns an array only when the search text is a query and not a URL.
       */
      if (typeOfSearch === SearchType.URL) {
        const dummyArray: OneDriveResponse[] = [response];
        const items: CloudItem[] = dummyArray.map((oneDriveItem: OneDriveItem) => {
          return this.constructCloudItem(oneDriveItem);
        });
        return items;
      } else {
        const items: CloudItem[] = response.value.map((oneDriveItem: OneDriveItem) => {
          return this.constructCloudItem(oneDriveItem);
        });
        return items;
      }
    });
  }
}

export { OneDriveRequestor };
