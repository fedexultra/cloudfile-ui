import { CloudItem } from '../types/CloudItemTypes';
import { DropboxRequestor } from '../requestors/DropboxRequestor';
import { Request } from '../types/ShimTypes';
import { ProviderInfo } from './ProviderInfo';
export declare class Dropbox extends ProviderInfo {
    private defaultFolder;
    private providerName;
    constructDownloadRequest(item: CloudItem, requestor: DropboxRequestor): Request;
    getDefaultFolder(): string;
    getProviderName(): string;
}
