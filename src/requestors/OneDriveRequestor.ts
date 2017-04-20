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

import { AuthInfo, Severity } from '../types/ShimTypes';
import { BasicCloudItem, CloudItem, CloudItemType } from '../types/CloudItemTypes';
import { createCloudItem, determineExtension } from '../utils/CloudItemUtilities';
import { ProviderInfo } from '../providers/ProviderInfo';
import { Requestor, SearchType } from './Requestor';
import { shim } from '../shim/Shim';

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

interface DriveTypeResponse {
  driveType: string;
};

class OneDriveRequestor extends Requestor {
  private baseUrl: string;
  private static invalidSearchCharsRegEx: RegExp = new RegExp('\\|\/|\'|:|%3A|%2F|%5C|%27'); // Match \, /, ', :, and encoded versions

  public constructor(auth: AuthInfo, providerInfo: ProviderInfo) {
    super(auth, providerInfo);
    this.baseUrl = 'https://graph.microsoft.com/v1.0/me';
    this.getDriveTypeResponse = this.getDriveTypeResponse.bind(this);
    this.isSearchDisabled = this.isSearchDisabled.bind(this);
  }

  private sendOneDriveRequest(url: string): Promise<Response> {
    return this.sendRequest(url, {
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

  private getDriveTypeResponse(url: string): Promise<DriveTypeResponse> {
    return this.sendOneDriveRequest(url).then(response => <Promise<DriveTypeResponse>> response.json());
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

    // If we ever get an undefined path, we want to return an empty array, we can't connect to that file
    // anyway so this is to make sure we don't crash.
    if (typeof pathReference.path === 'undefined') {
      return [];
    }
    const pathArray: string[] = pathReference.path.split('/');
    let path: BasicCloudItem[] = [];
    let startIdx = 0;
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
        const index = pathReference.path.indexOf(pathArray[i], startIdx);
        startIdx = index + pathArray[i].length;
        path.push({
          id: pathReference.path.slice(0, startIdx),
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
    const urlSearchParams = new URLSearchParams(new URL(searchUrl).search);
    // Some files (e.g. JSON, text files) for OneDrive use TextFileEditor, which has 'id' instead of 'resid'
    if (urlSearchParams.has('resid')) {
      // We know for sure that 'resid' exists, so we cast here for the compiler
      return <string> urlSearchParams.get('resid');
    } else if ((urlSearchParams.get('v') === 'TextFileEditor') && urlSearchParams.has('id')) {
      // We know for sure that 'id' exists, so we cast here for the compiler
      return <string> urlSearchParams.get('id');
    } else {
      throw new Error(`Could not process search URL: ${searchUrl}`);
    }
  }
  private buildSearchRequest(searchText: string, typeOfSearch: SearchType): string {
    // This tries to determine if the searchText entered is a file url for OneDrive

    if (typeOfSearch === SearchType.URL) {
      /* getFileIdFromSearchUrl can return an empty string, which will return an invalid response
       * that eventually gets handled as an incorrect url error
      */
      return this.baseUrl + '/drive/items/' + this.getFileIdFromSearchUrl(searchText);
    } else {
      this.validateSearchText(searchText);
      return this.baseUrl + '/drive/root/search(q=\'{' + encodeURIComponent(searchText) + '}\')';
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

  private validateSearchText(searchText: string): void {
    if (OneDriveRequestor.invalidSearchCharsRegEx.test(encodeURIComponent(searchText))) {
      throw new Error(`Search could not be performed because query contains invalid characters. Query: ${searchText}`);
    }
  }

  public isSearchDisabled(): Promise<boolean> {
    return Promise.resolve(this.getDriveTypeResponse(this.baseUrl + '/drive').then((response: DriveTypeResponse) => {
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
    let urlRequest: string;
    try {
      urlRequest = this.buildSearchRequest(query, typeOfSearch);
    } catch (e) {
      shim.log({message: e}, Severity.Info);
      return Promise.reject(e);
    }

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
