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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CloudItemTypes_1 = require("../types/CloudItemTypes");
var CloudFileColumns_1 = require("../constants/CloudFileColumns");
var SortOrderTypes_1 = require("../types/SortOrderTypes");
// compare functions to define sort order should adhere to the following rules
// If compareFunction(a, b) returns a value less than 0, a is before b
// If compareFunction(a, b) returns  0, a is equal to b
// If compareFunction(a, b) returns a value more than 0, a is after b
function ascNameSort(a, b) {
    return a.cloudItem.name.localeCompare(b.cloudItem.name);
}
exports.ascNameSort = ascNameSort;
// Kind ascending order is folder, file extensions (i.e. .xls), file
function ascKindSort(a, b) {
    // If a is a file and b is a folder, isFolder(b.cloudFile) - isFolder(a.cloudFile) = 1
    // If a is a folder and b is a file, isFolder(b.cloudFile) - isFolder(a.cloudFile) = -1
    return (isFolder(b.cloudItem) - isFolder(a.cloudItem)) ||
        (a.cloudItem.displayKind.localeCompare(b.cloudItem.displayKind));
}
exports.ascKindSort = ascKindSort;
function ascModifiedAtSort(a, b) {
    return a.cloudItem.modifiedAt.getTime() - b.cloudItem.modifiedAt.getTime();
}
exports.ascModifiedAtSort = ascModifiedAtSort;
function getColumn(columnId) {
    return CloudFileColumns_1.getCloudFileColumns()[columnId];
}
exports.getColumn = getColumn;
function isFolder(item) {
    return (item.type === CloudItemTypes_1.CloudItemType.Folder ? 1 : 0);
}
function sortColumn(rows, columnId, sortOrder) {
    var orderedRows = [];
    switch (getColumn(columnId).id) {
        case 0:
            {
                orderedRows = rows.sort(ascNameSort);
            }
            break;
        case 1:
            {
                orderedRows = rows.sort(ascKindSort);
            }
            break;
        default:
            {
                orderedRows = rows.sort(ascModifiedAtSort);
            }
            break;
    }
    if (sortOrder === SortOrderTypes_1.SortOrder.descending) {
        return orderedRows.reverse();
    }
    return orderedRows;
}
exports.sortColumn = sortColumn;
//# sourceMappingURL=ColumnUtilities.js.map