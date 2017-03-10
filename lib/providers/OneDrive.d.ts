import { CloudItem } from '../types/CloudItemTypes';
import { Request } from '../types/ShimTypes';
import { OneDriveRequestor } from '../requestors/OneDriveRequestor';
import { ProviderInfo } from './ProviderInfo';
export declare class OneDrive extends ProviderInfo {
    private defaultFolder;
    private providerName;
    constructDownloadRequest(item: CloudItem, requestor: OneDriveRequestor): Request;
    getDefaultFolder(): string;
    getProviderName(): string;
}
