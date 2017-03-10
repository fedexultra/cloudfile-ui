import 'isomorphic-fetch';
import { AuthInfo } from '../types/ShimTypes';
import { CloudItem } from '../types/CloudItemTypes';
import { ProviderInfo } from '../providers/ProviderInfo';
import { Requestor } from './Requestor';
declare class DropboxRequestor extends Requestor {
    private baseUrl;
    private contentUrl;
    private fields;
    constructor(auth: AuthInfo, providerInfo: ProviderInfo);
    private sendDropboxRequest(url, body);
    private getDropboxItems(url, body);
    private getDropboxMatches(url, body);
    private determineCloudItemType(rawItemType);
    private getPath(pathDisplay);
    private getDate(date);
    enumerateItems(folderPath?: string): Promise<CloudItem[]>;
    getDownloadUrl(): string;
    search(query: string): Promise<CloudItem[]>;
}
export { DropboxRequestor };
