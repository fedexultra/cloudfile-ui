import { CloudItem } from '../types/CloudItemTypes';
import { FileAttrs, Request } from '../types/ShimTypes';
import { Requestor } from '../requestors/Requestor';
declare abstract class ProviderInfo {
    abstract constructDownloadRequest(item: CloudItem, requestor: Requestor): Request;
    abstract getDefaultFolder(): string;
    abstract getProviderName(): string;
    constructFileAttrs(selectedFile: CloudItem): FileAttrs;
}
export { ProviderInfo };
