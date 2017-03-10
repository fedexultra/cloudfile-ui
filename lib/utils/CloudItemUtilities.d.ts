import { BasicCloudItem, CloudItem, CloudItemType } from '../types/CloudItemTypes';
import { FileTypeMap } from '../types/ShimTypes';
export declare function createCloudItem(id: string, type: CloudItemType, name: string, extension: string, modifiedAt: Date, path: BasicCloudItem[]): CloudItem;
export declare function createBasicCloudItem(item: CloudItem): BasicCloudItem;
export declare function determineExtension(type: CloudItemType, name: string): string;
export declare function initializeCloudItemUtilities(supportedFileTypes: FileTypeMap): void;
