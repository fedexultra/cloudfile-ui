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
import 'url-polyfill';

import { AuthInfo } from '../types/ShimTypes';
import { BasicCloudItem, CloudItem, CloudItemType } from '../types/CloudItemTypes';
import { CloudItemNotFoundError } from '../utils/Errors';
import { createCloudItem, determineExtension } from '../utils/CloudItemUtilities';
import { Logger } from '../utils/Logger';
import { ProviderInfo } from '../providers/ProviderInfo';
import { Requestor, SearchType } from './Requestor';

// This is 1000 because 1000 is the upper limit of allowed results per page for a search
const MAX_RESULTS_FOR_SEARCH = 1000;

interface DropboxItem {
  path_display: string; // Path of cloud item. Used for cloud item id and breadcrumb
  name: string;
  '.tag': string; // Indicates if item is a folder or file
  server_modified: string; // Only defined for files
}

interface DropboxFolder {
  entries: DropboxItem[];
  has_more: boolean;
  cursor: string;
};

// Types for searching
interface DropboxMatch {
  metadata: DropboxItem;
}

interface DropboxMatches {
  more: boolean;
  start: string;
  matches: DropboxMatch[];
};

class DropboxRequestor extends Requestor {
  private baseUrl: string;
  private contentUrl: string;
  private searchUrlHostName: string;
  private searchUrlPathNamePrefix: string;
  private fields: string;
  private logLocationPrefix: string = 'DropboxRequestor.';

  public constructor(auth: AuthInfo, providerInfo: ProviderInfo) {
    super(auth, providerInfo);
    this.baseUrl = 'https://api.dropboxapi.com/2/';
    this.contentUrl = 'https://content.dropboxapi.com/2/';
    this.searchUrlHostName = 'www.dropbox.com';
    this.searchUrlPathNamePrefix = '/home';
    this.fields = 'fields=path_display,name,.tag,server_modified';
    Logger.info(this.logLocationPrefix + 'constructor', 'Constructed Dropbox Requestor.');
  }

  private sendDropboxRequest(url: string, body: Object): Promise<Response> {
    Logger.debug(this.logLocationPrefix + 'sendDropboxRequest', `url=${url} body=${JSON.stringify(body)}`);
    return this.sendRequest(url, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + this.auth.accessToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
  }

  private getSinglePageOfDropboxItems(url: string, body: Object): Promise<DropboxFolder> {
    Logger.debug(this.logLocationPrefix + 'getSinglePageOfDropboxItems', `url=${url} body=${JSON.stringify(body)}`);
    return this.sendDropboxRequest(url, body).then(response => <Promise<DropboxFolder>> response.json());
  }

  private getSinglePageOfDropboxMatches(url: string, body: Object): Promise<DropboxMatches> {
    Logger.debug(this.logLocationPrefix + 'getSinglePageOfDropboxMatches', `url=${url} body=${JSON.stringify(body)}`);
    return this.sendDropboxRequest(url, body).then(response => <Promise<DropboxMatches>> response.json());
  }

  private determineCloudItemType(rawItemType: string): CloudItemType {
    const logLocation = this.logLocationPrefix + 'determineCloudItemType';
    Logger.info(logLocation, `rawItemType=${rawItemType}`);
    switch (rawItemType) {
      case 'folder':
        Logger.info(logLocation, 'Dropbox item type is a folder.');
        return CloudItemType.Folder;
      case 'file':
        Logger.info(logLocation, 'Dropbox item type is a file.');
        return CloudItemType.File;
      default:
        Logger.info(logLocation, 'Dropbox item type is unknown.');
        return CloudItemType.Unknown;
    }
  }

  private getPath(pathDisplay: string): BasicCloudItem[] {
    // pathDisplay is returned as the cloud item's full path without the root folder
    // i.e. "/Folder1/Folder2"
    // Therefore, pathArray is created as ["", "Folder1", "Folder2"]
    const logLocation = this.logLocationPrefix + 'getPath';
    Logger.debug(logLocation, `pathDisplay=${pathDisplay}`);
    const pathArray: string[] = pathDisplay.split('/');
    let path: BasicCloudItem[] = [];
    let startIdx = 0;
    for (let i = 0; i < pathArray.length; i++) {
      if (i === 0 && pathArray[i] === '') {
        path.push({
          id: this.providerInfo.getDefaultFolder(),
          name: this.providerInfo.getProviderName(),
          type: CloudItemType.Folder
        });
      } else if (i === pathArray.length - 1) {
        // path is used to set the Breadcrumb. The way FilterableDataGrid is set up assumes that we do not
        // include the current folder as part of the path. Dropbox does include the current folder as part
        // of the path, which is why we do not push the last item into the array
        continue;
      } else {
        // Need to ignore previously processed substring of pathDisplay in case pathDisplay contains
        // two folders with the same name, e.g. "/FolderA/FolderB/FolderA/file.xlsx"
        const index = pathDisplay.indexOf(pathArray[i], startIdx);
        startIdx = index + pathArray[i].length;
        path.push({
          id: pathDisplay.slice(0, startIdx),
          name: pathArray[i],
          type: CloudItemType.Folder
        });
      }
    }
    // We want path returned as [<root_folder>, <rest_of_the_items>]
    Logger.info(logLocation, `Path is: ${JSON.stringify(path)}`);
    return path;
  }

  private getDate(date: string): Date {
    const logLocation = this.logLocationPrefix + 'getDate';
    Logger.debug(logLocation, `date=${date}`);
    if (typeof (date) === 'undefined') { // cloud item is a folder
      const result: Date = new Date(0);
      Logger.info(logLocation, `Date is undefined. Setting date as: ${result.toString()}`);
      return result;
    } else { // cloud item is a file
      const result: Date = new Date(date);
      Logger.info(logLocation, `Date is defined as ${date}. Setting date as: ${result.toString()}`);
      return result;
    }
  }

  private constructCloudItem(entry: DropboxItem): CloudItem {
    const logLocation = this.logLocationPrefix + 'constructCloudItem';
    Logger.debug(logLocation, `entry=${JSON.stringify(entry)}`);
    const type = this.determineCloudItemType(entry['.tag']);
    const createdCloudItem: CloudItem = createCloudItem(
      entry.path_display, // id is its path
      type,
      entry.name,
      determineExtension(type, entry.name),
      this.getDate(entry.server_modified),
      this.getPath(entry.path_display));
    Logger.debug(logLocation, `Created cloudItem: ${JSON.stringify(createdCloudItem)}`);
    return createdCloudItem;
  }

  private getAllDropboxItems(currentListOfItems: CloudItem[], currentResponse: DropboxFolder): Promise<CloudItem[]> {
    const logLocation = this.logLocationPrefix + 'getAllDropboxItems';
    Logger.debug(logLocation, 'Recursing...' +
                              `currentListOfItems=${JSON.stringify(currentListOfItems)} ` +
                              `currentResponse=${JSON.stringify(currentResponse)}`);
    if (!currentResponse.has_more) {
      Logger.debug(logLocation, `Current response doesn't have more items. Ending recursion...` +
                                `currentListOfItems=${JSON.stringify(currentListOfItems)} ` +
                                `currentResponse=${JSON.stringify(currentResponse)}`);
      return Promise.resolve(currentListOfItems);
    }
    const urlRequest = this.baseUrl + 'files/list_folder/continue';
    return this.getSinglePageOfDropboxItems(urlRequest, { cursor: currentResponse.cursor }).then((response) => {
      currentListOfItems = currentListOfItems.concat(response.entries.map((entry: DropboxItem) => {
        return this.constructCloudItem(entry);
      }));
      return this.getAllDropboxItems(currentListOfItems, response);
    });
  }

  private getAllDropboxMatches(currentListOfItems: CloudItem[], currentResponse: DropboxMatches,
                               path: string, query: string): Promise<CloudItem[]> {
    const logLocation = this.logLocationPrefix + 'getAllDropboxMatches';
    Logger.debug(logLocation, 'Recursing...' +
                              `currentListOfItems=${JSON.stringify(currentListOfItems)} ` +
                              `currentResponse=${JSON.stringify(currentResponse)}` +
                              `path=${path}` +
                              `query=${query}`);
    if (!currentResponse.more) {
      Logger.debug(logLocation, `Current response doesn't have more items. Ending recursion...` +
                                `currentListOfItems=${JSON.stringify(currentListOfItems)} ` +
                                `currentResponse=${JSON.stringify(currentResponse)}` +
                                `path=${path}` +
                                `query=${query}`);
      return Promise.resolve(currentListOfItems);
    }
    const urlRequest = this.baseUrl + 'files/search';
    return this.getSinglePageOfDropboxMatches(urlRequest, { path: path,
                                                            query: query,
                                                            start: currentResponse.start,
                                                            max_results: MAX_RESULTS_FOR_SEARCH }).then((response) => {
      currentListOfItems = currentListOfItems.concat(response.matches.map((entry: DropboxMatch) => {
        return this.constructCloudItem(entry.metadata);
      }));
      return this.getAllDropboxMatches(currentListOfItems, response, path, query);
    });
  }

  public enumerateItems(folderPath: string = ''): Promise<CloudItem[]> {
    // POST https://api.dropboxapi.com/2/files/list_folder
    // body: {path: <cloud_item_path>}
    Logger.debug(this.logLocationPrefix + 'enumerateItems', `folderPath=${folderPath}`);
    const urlRequest = this.baseUrl + 'files/list_folder';
    return this.getSinglePageOfDropboxItems(urlRequest, { path: folderPath }).then((response) => {
      let items: CloudItem[] = response.entries.map((entry: DropboxItem) => {
        return this.constructCloudItem(entry);
      });
      if (response.has_more) {
        return this.getAllDropboxItems(items, response);
      }
      return items;
    });
  }

  public getDownloadUrl(): string {
    // POST https://content.dropboxapi.com/2/files/download
    // header: { Dropbox-API-Arg: { path: <cloud_file_path> } }
    const downloadUrl: string = this.contentUrl + 'files/download';
    Logger.debug(this.logLocationPrefix + 'getDownloadUrl', `downloadUrl=${downloadUrl}`);
    return downloadUrl;
  }

  private getDropboxItem(filePath: string): Promise<DropboxItem> {
    // POST https://api.dropboxapi.com/2/files/get_metadata
    // body: {path: <filePath>}
    Logger.debug(this.logLocationPrefix + 'getDropboxItem', `filePath=${filePath}`);
    const url = this.baseUrl + 'files/get_metadata';
    const body: Object = { path: filePath };
    return this.sendDropboxRequest(url, body).then(response => <Promise<DropboxItem>> response.json());
  }

  private getDropboxFilePathFromSearchUrl(query: string): string {
    // Convert https://www.dropbox.com/home/SubFolder?preview=1.xlsx TO SubFolder/1.xlsx
    Logger.debug(this.logLocationPrefix + 'getDropboxFilePathFromSearchUrl', `query=${query}`);
    const url = new URL(query);
    let filename = new URLSearchParams(url.search).get('preview');
    // URL pathname (e.g. '/home/SubFolder') should start with '/home'
    if (url.hostname === this.searchUrlHostName &&
        url.pathname.indexOf(this.searchUrlPathNamePrefix) === 0 &&
        filename !== null && filename !== '') {
      // Remove '/home' from the pathname to get the directory path
      const dir = decodeURIComponent(url.pathname.substr(this.searchUrlPathNamePrefix.length));
      // Spaces in the filename need to be replaced separately since decodeURI does not handle it
      filename = decodeURIComponent(filename.replace(/\+/gm, ' '));
      return dir + '/' + filename;
    }
    return '';
  }

  private getDropboxItemFromUrl(query: string): Promise<CloudItem> {
    const logLocation = this.logLocationPrefix + 'getDropboxItemFromUrl';
    Logger.debug(logLocation, `query=${query}`);
    const filePath = this.getDropboxFilePathFromSearchUrl(query);
    if (filePath !== '') {
      Logger.info(logLocation, `There is a file path from the search url. filePath=${filePath}`);
      return this.getDropboxItem(filePath).then((response) => {
        Logger.debug(logLocation, `response=${JSON.stringify(response)}`);
        // This checks if the response is valid. This will go away when we have better error handling. Story 623632
        if (response.name !== '') {
          Logger.info(logLocation, 'getDropboxItem returned a valid response. Constructing a Cloud Item....');
          return this.constructCloudItem(response);
        }
        Logger.error(logLocation, 'getDropboxItem returned an invalid response. Throwing CloudItemNotFoundError.');
        throw new CloudItemNotFoundError();
      });
    }
    Logger.info(logLocation, 'Cannot find file path from the search query.');
    return Promise.reject(new CloudItemNotFoundError());
  }

  public search(query: string): Promise<CloudItem[]> {
    const logLocation = this.logLocationPrefix + 'search';
    Logger.debug(logLocation, `query=${query}`);
    const typeOfSearch = this.getSearchType(query);
    if (typeOfSearch === SearchType.URL) {
      Logger.info(logLocation, 'Search query is a url.');
      return this.getDropboxItemFromUrl(query)
      .then(item => { return [ item ]; } )
      .catch((error: Error) => {
        if (<CloudItemNotFoundError> error !== undefined) {
          Logger.warn(logLocation, `Known error was caught after entering invalid url ${query}. Error: ${JSON.stringify(error)}`);
          return [];
        } else {
          Logger.warn(logLocation, `Unknown error was caught after entering invalid url ${query}. Error is undefined.`);
          return [];
        }
      });
    } else {
      // POST https://api.dropboxapi.com/2/files/search
      // body: {path: '', query: <query>}
      Logger.info(logLocation, 'Search query is a keyword');
      const urlRequest = this.baseUrl + 'files/search';
      return this.getSinglePageOfDropboxMatches(urlRequest, { path: '',
                                                              query: query,
                                                              max_results: MAX_RESULTS_FOR_SEARCH }).then((response) => {
        const items: CloudItem[] = response.matches.map((entry: DropboxMatch) => {
          return this.constructCloudItem(entry.metadata);
        });
        if (response.more) {
          return this.getAllDropboxMatches(items, response, '', query);
        }
        return items;
      });
    }
  }
}

export { DropboxRequestor };
