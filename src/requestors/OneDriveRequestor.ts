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
import { Requestor, SearchType } from './Requestor';

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

interface OneDriveFolder {
  ['@odata.nextLink']?: string;
  value: OneDriveItem[];
};

interface OneDriveDefaultDriveResponse {
  driveType: string;
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

  private getOneDriveItems(url: string): Promise<OneDriveFolder> {
    return this.sendOneDriveRequest(url).then(response => <Promise<OneDriveFolder>> response.json());
  }

  private getOneDriveItem(url: string): Promise<OneDriveItem> {
    return this.sendOneDriveRequest(url).then(response => <Promise<OneDriveItem>> response.json());
  }

  private getOneDriveDefaultDrive(url: string): Promise<OneDriveDefaultDriveResponse> {
    return this.sendOneDriveRequest(url).then(response => <Promise<OneDriveDefaultDriveResponse>> response.json());
  }

  // Recursively calling Promises is stack-safe. We will not run into stack overflow errors.
  private getAllOneDriveItems(currentListOfItems: CloudItem[], url: string | undefined, firstCall: boolean): Promise<CloudItem[]> {
    if (!url && !firstCall) {
      return Promise.resolve(currentListOfItems);
    }
    return this.getOneDriveItems(<string> url).then((oneDriveFolder: OneDriveFolder) => {
      const newListOfItems: CloudItem[] = currentListOfItems.concat(oneDriveFolder.value.map((oneDriveItem: OneDriveItem) => {
        return this.constructCloudItem(oneDriveItem);
      }));
      return this.getAllOneDriveItems(newListOfItems, oneDriveFolder['@odata.nextLink'], false);
    });
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
    return this.getAllOneDriveItems([], urlRequest, true);
  }

  public getDownloadUrl(fileID: string): string {
    // GET https://graph.microsoft.com/v1.0/me/drive/root:/{item-path}:/content
    return this.baseUrl + fileID + ':/content';
  }

  private getFileIdFromSearchUrl(searchUrl: string): string {
    let fileId = new URLSearchParams(new URL(searchUrl).search).get('resid');
    if (fileId === null) {
      return '';
    }
    return fileId;
  }
  private buildSearchRequest(searchText: string, typeOfSearch: SearchType): string {
    // This tries to determine if the searchText entered is a file url for OneDrive

    if (typeOfSearch === SearchType.URL) {
      /* getFileIdFromSearchUrl can return an empty string, which will return an invalid response
       * that eventually gets handled as an incorrect url error
      */
      return this.baseUrl + '/drive/items/' + this.getFileIdFromSearchUrl(searchText);
    }
    return this.baseUrl + '/drive/root/search(q=\'{' + searchText + '}\')';
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

  public isSearchDisabled(): Promise<boolean> {
    return Promise.resolve(this.getOneDriveDefaultDrive(this.baseUrl + '/drive').then((response: OneDriveDefaultDriveResponse) => {
      if (response.driveType.indexOf('business') !== -1) {
        return true;
      }
      return false;
    }));
  }

  public search(query: string): Promise<CloudItem[]> {
    // GET https://graph.microsoft.com/v1.0/me/drive/root/search(q='{<SEARCH_TEXT>}')
    // GET https://graph.microsoft.com/v1.0/me/drive/items/<FILE_ID>
    const typeOfSearch = this.getSearchType(query);
    const urlRequest = this.buildSearchRequest(query, typeOfSearch);

    if (typeOfSearch === SearchType.URL) {
      return this.getOneDriveItem(urlRequest).then((response) => {
        // This checks if the response is valid. This will go away when we have better error handling. Story 623632
        if (response.parentReference !== undefined) {
          return [this.constructCloudItem(response)];
        }
        return [];
      });
    } else {
      return this.getAllOneDriveItems([], urlRequest, true);
    }
  }
}

export { OneDriveRequestor };
