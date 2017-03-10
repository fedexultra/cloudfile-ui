import 'isomorphic-fetch';
import { AuthInfo } from '../types/ShimTypes';
import { CloudItem } from '../types/CloudItemTypes';
import { ProviderInfo } from '../providers/ProviderInfo';
import { Requestor } from './Requestor';
declare class BoxRequestor extends Requestor {
    private baseUrl;
    private fields;
    private limitField;
    constructor(auth: AuthInfo, providerInfo: ProviderInfo);
    private sendBoxRequest(url);
    private requestBoxItems(url);
    private getCloudItem(promise);
    private getCloudItemArray(promise, urlRequest);
    private constructItem(apiObj);
    private static determineCloudItemType(rawItemType);
    private getItemFromUrl(url);
    private searchForItems(searchQuery);
    enumerateItems(folderId?: string): Promise<CloudItem[]>;
    getDownloadUrl(fileID: string): string;
    search(query: string): Promise<CloudItem[]>;
}
export { BoxRequestor };
