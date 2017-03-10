import { AuthInfo } from '../types/ShimTypes';
import { CloudItem } from '../types/CloudItemTypes';
import { ProviderInfo } from '../providers/ProviderInfo';
declare abstract class Requestor {
    auth: AuthInfo;
    providerInfo: ProviderInfo;
    static searchUrlRegex: RegExp;
    constructor(auth: AuthInfo, providerInfo: ProviderInfo);
    private sendRequest(url, httpRequest);
    protected sendRequestWithRetry(url: string, httpRequest: Object): Promise<Response>;
    abstract enumerateItems(folder: string): Promise<CloudItem[]>;
    abstract getDownloadUrl(fileID?: string): string;
    abstract search(query: string): Promise<CloudItem[]>;
}
export { Requestor };
