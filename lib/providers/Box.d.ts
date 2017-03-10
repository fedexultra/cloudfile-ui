import { BoxRequestor } from '../requestors/BoxRequestor';
import { CloudItem } from '../types/CloudItemTypes';
import { Request } from '../types/ShimTypes';
import { ProviderInfo } from './ProviderInfo';
export declare class Box extends ProviderInfo {
    private defaultFolder;
    private providerName;
    constructDownloadRequest(item: CloudItem, requestor: BoxRequestor): Request;
    getDefaultFolder(): string;
    getProviderName(): string;
}
