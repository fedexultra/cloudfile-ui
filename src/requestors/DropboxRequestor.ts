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

interface DropboxItem {
  path_display: string; // Path of cloud item. Used for cloud item id and breadcrumb
  name: string;
  '.tag': string; // Indicates if item is a folder or file
  server_modified: string; // Only defined for files
}

interface DropboxFolder {
  entries: DropboxItem[];
};

// Types for searching
interface DropboxMatch {
  metadata: DropboxItem;
}

interface DropboxMatches {
  matches: DropboxMatch[];
};

class DropboxRequestor extends Requestor {
  private baseUrl: string;
  private contentUrl: string;
  private fields: string;

  public constructor(auth: AuthInfo, providerInfo: ProviderInfo) {
    super(auth, providerInfo);
    this.baseUrl = 'https://api.dropboxapi.com/2/';
    this.contentUrl = 'https://content.dropboxapi.com/2/';
    this.fields = 'fields=path_display,name,.tag,server_modified';
  }

  private sendDropboxRequest(url: string, body: Object): Promise<Response> {
    return this.sendRequestWithRetry(url, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + this.auth.accessToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
  }

  private getDropboxItems(url: string, body: Object): Promise<DropboxFolder> {
    return this.sendDropboxRequest(url, body).then(response => <Promise<DropboxFolder>> response.json());
  }

  private getDropboxMatches(url: string, body: Object): Promise<DropboxMatches> {
    return this.sendDropboxRequest(url, body).then(response => <Promise<DropboxMatches>> response.json());
  }

  private determineCloudItemType(rawItemType: string): CloudItemType {
    switch (rawItemType) {
      case 'folder':
        return CloudItemType.Folder;
      case 'file':
        return CloudItemType.File;
      default:
        return CloudItemType.Unknown;
    }
  }

  private getPath(pathDisplay: string): BasicCloudItem[] {
    // pathDisplay is returned as the cloud item's full path without the root folder
    // i.e. "/Folder1/Folder2"
    // Therefore, pathArray is created as ["", "Folder1", "Folder2"]
    const pathArray: string[] = pathDisplay.split('/');
    let path: BasicCloudItem[] = [];
    for (let i = 0; i < pathArray.length; i++) {
      if (i === 0 && pathArray[i] === '') {
        path.push({
          id: this.providerInfo.getDefaultFolder(),
          name: this.providerInfo.getProviderName(),
          type: CloudItemType.Folder });
      } else if (i === pathArray.length - 1) {
        // path is used to set the Breadcrumb. The way FilterableDataGrid is set up assumes that we do not
        // include the current folder as part of the path. Dropbox does include the current folder as part
        // of the path, which is why we do not push the last item into the array
        continue;
      } else {
        const index = pathDisplay.indexOf(pathArray[i]);
        path.push({
          id: pathDisplay.slice(0, index + pathArray[i].length),
          name: pathArray[i],
          type: CloudItemType.Folder
        });
      }
    }
    // We want path returned as [<root_folder>, <rest_of_the_items>]
    return path;
  }

  private getDate(date: string): Date {
    if (typeof(date) === 'undefined') { // cloud item is a folder
      return new Date(0);
    } else { // cloud item is a file
      return new Date(date);
    }
  }

  public enumerateItems(folderPath: string = ''): Promise<CloudItem[]> {
    // POST https://api.dropboxapi.com/2/files/list_folder
    // body: {path: <cloud_item_path>}
    const urlRequest = this.baseUrl + 'files/list_folder';
    return this.getDropboxItems(urlRequest, { path: folderPath }).then((response) => {
      const items: CloudItem[] = response.entries.map((entry: DropboxItem) => {
        const type = this.determineCloudItemType(entry['.tag']);
        return createCloudItem(
          entry.path_display, // id is its path
          type,
          entry.name,
          determineExtension(type, entry.name),
          this.getDate(entry.server_modified),
          this.getPath(entry.path_display)
        );
      });
      return items;
    });
  }

  public getDownloadUrl(): string {
    // POST https://content.dropboxapi.com/2/files/download
    // header: { Dropbox-API-Arg: { path: <cloud_file_path> } }
    return this.contentUrl + 'files/download';
  }

  public search(query: string): Promise<CloudItem[]> {
    // POST https://api.dropboxapi.com/2/files/search
    // body: {path: '', query: <query>}
    const urlRequest = this.baseUrl + 'files/search';
    return this.getDropboxMatches(urlRequest, { path: '', query: query }).then((response) => {
      const items: CloudItem[] = response.matches.map((entry: DropboxMatch) => {
        const type = this.determineCloudItemType(entry.metadata['.tag']);
        return createCloudItem(
          entry.metadata.path_display, // id is its path
          type,
          entry.metadata.name,
          determineExtension(type, entry.metadata.name),
          this.getDate(entry.metadata.server_modified),
          this.getPath(entry.metadata.path_display)
        );
      });
      return items;
    });
  }
}

export { DropboxRequestor };