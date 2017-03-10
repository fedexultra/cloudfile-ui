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

  private getOneDriveItems(url: string): Promise<OneDriveFolder> {
    return this.sendOneDriveRequest(url).then(response => <Promise<OneDriveFolder>> response.json());
  }

  private determineCloudItemType(item: OneDriveItem): CloudItemType {
    if (typeof(item.folder) !== 'undefined') {
      return CloudItemType.Folder;
    } else if (typeof(item.file) !== 'undefined') {
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
          type: CloudItemType.Folder });
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
        const type = this.determineCloudItemType(entry);
        return createCloudItem(
          entry.parentReference.path + '/' + entry.name, // id is its path
          type,
          entry.name,
          determineExtension(type, entry.name),
          new Date(entry.lastModifiedDateTime),
          this.getPath(entry.parentReference)
        );
      });
      return items;
    });
  }

  public getDownloadUrl(fileID: string): string {
    // GET https://graph.microsoft.com/v1.0/me/drive/root:/{item-path}:/content
    return this.baseUrl + fileID + ':/content';
  }

  public search(query: string): Promise<CloudItem[]> {
    // GET https://graph.microsoft.com/v1.0/me/drive/root/search(q='{search-text}')
    const urlRequest = this.baseUrl + '/drive/root/search(q=\'{' + query + '}\')';
    return this.getOneDriveItems(urlRequest).then((response) => {
      const items: CloudItem[] = response.value.map((entry: OneDriveItem) => {
        const type = this.determineCloudItemType(entry);
        return createCloudItem(
          entry.parentReference.path + '/' + entry.name, // id is its path
          type,
          entry.name,
          determineExtension(type, entry.name),
          new Date(entry.lastModifiedDateTime),
          this.getPath(entry.parentReference)
        );
      });
      return items;
    });
  }
}

export { OneDriveRequestor };
