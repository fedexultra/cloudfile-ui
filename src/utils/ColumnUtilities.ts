// -----------------------------------------------------------------------------
//
// This file is the copyrighted property of Tableau Software and is protected
// by registered patents and other applicable U.S. and international laws and
// regulations.
//
// Unlicensed use of the contents of this file is prohibited. Please refer to
// the NOTICES.txt file for further details.
//
// -----------------------------------------------------------------------------

import { CloudItem, CloudItemType } from '../types/CloudItemTypes';
import { Formatters } from '../codegen/Localize';
import { getCloudFileColumns } from '../constants/CloudFileColumns';
import { Column, Row } from '../types/DataGridTypes';
import { SortOrder } from '../types/SortOrderTypes';

// compare functions to define sort order should adhere to the following rules
// If compareFunction(a, b) returns a value less than 0, a is before b
// If compareFunction(a, b) returns  0, a is equal to b
// If compareFunction(a, b) returns a value more than 0, a is after b

export function ascNameSort(a: Row, b: Row): number {
  return a.cloudItem.name.localeCompare(b.cloudItem.name);
}

// Kind ascending order is folder, file extensions (i.e. .xls), file
export function ascKindSort(a: Row, b: Row): number {
  // If a is a file and b is a folder, isFolder(b.cloudFile) - isFolder(a.cloudFile) = 1
  // If a is a folder and b is a file, isFolder(b.cloudFile) - isFolder(a.cloudFile) = -1
  return (isFolder(b.cloudItem) - isFolder(a.cloudItem)) ||
    (a.cloudItem.displayKind.localeCompare(b.cloudItem.displayKind));
}

export function ascModifiedAtSort(a: Row, b: Row): number {
  return a.cloudItem.modifiedAt.getTime() - b.cloudItem.modifiedAt.getTime();
}

export function getColumn(columnId: number): Column {
  return getCloudFileColumns()[columnId];
}

function isFolder(item: CloudItem): number {
  return (item.type === CloudItemType.Folder ? 1 : 0);
}

export function getFormattedDateString(row: Row): string {
  return (row.cloudItem.modifiedAt.getDate() === new Date(0).getDate()) ? '--' : Formatters.formatMediumDate(row.cloudItem.modifiedAt);
}

export function sortColumn(rows: Row[], columnId: number, sortOrder: SortOrder): Row[] {
  let orderedRows: Row[] = [];

  switch (getColumn(columnId).id) {
    case 0: {
      orderedRows = rows.sort(ascNameSort);
    } break;
    case 1: {
      orderedRows = rows.sort(ascKindSort);
    } break;
    default: {
      orderedRows = rows.sort(ascModifiedAtSort);
    } break;
  }

  if (sortOrder === SortOrder.descending) {
    return orderedRows.reverse();
  }
  return orderedRows;
}
