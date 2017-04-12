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
import { CloudItemNotFoundError } from '../utils/Errors';
import { log } from '../utils/Logger';
import { ProviderInfo } from '../providers/ProviderInfo';
import { Requestor, SearchType } from './Requestor';

// This interface is a filtered set of key names that Box returns
// as its basic representation of a file in a path_collection.
interface BoxBasicItem {
  id: string;
  name: string;
  type: string;
}

interface BoxBasicItemCollection {
  entries: BoxBasicItem[];
}

// This interface is a filtered set of key names that Box returns
// as its representation of a file.
interface BoxItem extends BoxBasicItem {
  modified_at: string;
  path_collection: BoxBasicItemCollection;
}

interface BoxFolder {
  entries: BoxItem[];
  limit: number;
  offset: number;
  total_count: number;
};

class BoxRequestor extends Requestor {
  private baseUrl: string;
  private fields: string;
  private limitField: string;

  public constructor(auth: AuthInfo, providerInfo: ProviderInfo) {
    super(auth, providerInfo);
    this.baseUrl = 'https://api.box.com/2.0/';
    this.fields = 'fields=id,name,modified_at,type,path_collection';
    this.limitField = 'limit=1000';
  }

  private sendBoxRequest(url: string): Promise<Response> {
    return this.sendRequest(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + this.auth.accessToken
      }
    });
  }

  private requestBoxItems(url: string): Promise<BoxFolder> {
    return this.sendBoxRequest(url).then(response => <Promise<BoxFolder>> response.json());
  }

  // Extracts a CloudItem from a fetch response promise
  private getCloudItem(promise: Promise<Response>): Promise<CloudItem> {
    return promise.then((response) => {
      if (response.status === 404) {
        throw new CloudItemNotFoundError();
      }
      const file: Promise<BoxItem> = response.json();
      return file.then(this.constructItem);
    });
  }

  // Extracts an array of CloudItems from fetch response promise(s). Supports paging and fetches all the results
  private getCloudItemArray(promise: Promise<BoxFolder>, urlRequest: string): Promise<CloudItem[]> {
    return promise.then((boxFolder) => {
      let cloudItems: CloudItem[] = [];
      cloudItems = cloudItems.concat(boxFolder.entries.map(this.constructItem));
      // To retrieve the next page, set the offset=offset+limit
      let newOffset = boxFolder.limit + boxFolder.offset;
      // To determine if there are more records to fetch, check if the total number of items is more than the new offset
      if (boxFolder.total_count <= newOffset) {
        return cloudItems;
      }
      let pagePromiseArray: Promise<BoxFolder>[] = [];
      while (boxFolder.total_count > newOffset) {
        const newUrlRequest = urlRequest + '&offset=' + newOffset;
        const nextPromise: Promise<BoxFolder> = this.requestBoxItems(newUrlRequest);
        pagePromiseArray.push(nextPromise);
        newOffset += boxFolder.limit;
      }
      return Promise.all(pagePromiseArray).then(results => {
        results.forEach((pageBoxItems) => {
          cloudItems = cloudItems.concat(pageBoxItems.entries.map(this.constructItem));
        });
        return cloudItems;
      });
    });
  }

  // Creates a new CloudItem from a BoxFile, whose format is determined by the API
  private constructItem(apiObj: BoxItem): CloudItem {
    const type = BoxRequestor.determineCloudItemType(apiObj.type);
    return createCloudItem(
      apiObj.id,
      type,
      apiObj.name,
      determineExtension(type, apiObj.name),
      new Date(apiObj.modified_at),
      apiObj.path_collection.entries.map((pathCollectionEntry) => {
      return <BasicCloudItem> {
          id: pathCollectionEntry.id,
          name: pathCollectionEntry.name,
          type: BoxRequestor.determineCloudItemType(pathCollectionEntry.type),
      };
    }));
  }

  // Determines the CloudItemType for the raw provider item type.
  private static determineCloudItemType(rawItemType: string): CloudItemType {
    switch (rawItemType) {
      case 'folder':
        return CloudItemType.Folder;
      case 'file':
        return CloudItemType.File;
      default:
        return CloudItemType.Unknown;
    }
  }

  private getItemFromUrl(url: string): Promise<CloudItem> {
    // URL format: https://<subdomain>/<folder path>/f_<file id>
    const parts = url.split('?')[0].split('/');
    const filePart = parts[parts.length - 1];
    if (filePart.indexOf('f_') === 0) {
      const fileId = filePart.slice(2, filePart.length);
      const urlRequest = this.baseUrl + 'files/' + fileId + '?' + this.fields;
      const response: Promise<Response> = this.sendBoxRequest(urlRequest);
      return this.getCloudItem(response);
    } else {
      return Promise.reject(new CloudItemNotFoundError());
    }
  }

  private searchForItems(searchQuery: string): Promise<CloudItem[]> {
    const urlRequest = this.baseUrl + 'search?query=' + encodeURIComponent(searchQuery)  + '&' + this.limitField + '&' + this.fields;
    const response: Promise<BoxFolder> = this.requestBoxItems(urlRequest);
    return this.getCloudItemArray(response, urlRequest);
  }

  public enumerateItems(folderId: string = '0'): Promise<CloudItem[]> {
    const urlRequest = this.baseUrl + 'folders/' + folderId + '/items?' + this.limitField + '&' + this.fields;
    const response: Promise<BoxFolder> = this.requestBoxItems(urlRequest);
    return this.getCloudItemArray(response, urlRequest);
  }

  public getDownloadUrl(fileID: string): string {
    return this.baseUrl + 'files/' + fileID + '/content';
  }

  public search(query: string): Promise<CloudItem[]> {
    const typeOfSearch: SearchType = this.getSearchType(query);
    if (typeOfSearch === SearchType.URL) {
        return this.getItemFromUrl(query)
        .then(item => { return [ item ]; } )
        .catch((error: Error) => {
          if (<CloudItemNotFoundError> error !== undefined) {
            return [];
          } else {
            log(`Unknown error was caught after entering invalid url ${query}. Error message: ${error.message}`);
            return [];
          }
        });
      } else {
        return this.searchForItems(query);
      }
  }
}

export { BoxRequestor };
