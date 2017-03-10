import { IconDefinition } from '../types/IconTypes';
export declare enum CloudItemType {
    File = 0,
    Folder = 1,
    Unknown = 2,
}
export interface BasicCloudItem {
    id: string;
    name: string;
    type: CloudItemType;
}
export interface CloudItem {
    canBeSelected: boolean;
    displayAsEnabled: boolean;
    displayKind: string;
    extension: string;
    icon: IconDefinition;
    id: string;
    modifiedAt: Date;
    name: string;
    path: BasicCloudItem[];
    type: CloudItemType;
}
export declare class NullCloudItem implements CloudItem {
    canBeSelected: boolean;
    displayAsEnabled: boolean;
    displayKind: string;
    extension: string;
    icon: IconDefinition;
    id: string;
    modifiedAt: Date;
    name: string;
    path: BasicCloudItem[];
    type: CloudItemType;
    constructor();
}
