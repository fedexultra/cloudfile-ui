import 'isomorphic-fetch';
import { AuthInfo } from '../types/ShimTypes';
import { CloudItem } from '../types/CloudItemTypes';
import { ProviderInfo } from '../providers/ProviderInfo';
import { Requestor } from './Requestor';
declare class OneDriveRequestor extends Requestor {
    private baseUrl;
    constructor(auth: AuthInfo, providerInfo: ProviderInfo);
    private sendOneDriveRequest(url);
    private getOneDriveItems(url);
    private determineCloudItemType(item);
    private getPath(pathReference);
    enumerateItems(folderID?: string): Promise<CloudItem[]>;
    getDownloadUrl(fileID: string): string;
    search(query: string): Promise<CloudItem[]>;
}
export { OneDriveRequestor };
