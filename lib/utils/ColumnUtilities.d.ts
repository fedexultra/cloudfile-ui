import { Column, Row } from '../types/DataGridTypes';
import { SortOrder } from '../types/SortOrderTypes';
export declare function ascNameSort(a: Row, b: Row): number;
export declare function ascKindSort(a: Row, b: Row): number;
export declare function ascModifiedAtSort(a: Row, b: Row): number;
export declare function getColumn(columnId: number): Column;
export declare function sortColumn(rows: Row[], columnId: number, sortOrder: SortOrder): Row[];
