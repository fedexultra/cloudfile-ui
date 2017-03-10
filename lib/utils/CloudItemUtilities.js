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
var Icons_1 = require("../icons/Icons");
var Localize_1 = require("../codegen/Localize");
// All extensions supported by every file type, expanded out into
// a single array, e.g., ['ext', 'extension', 'mp3', 'flac'].
var allSupportedFileTypeExtensions;
// Verify initializeCloudItemUtilities has been called.
function confirmInitialization() {
    if ([] === allSupportedFileTypeExtensions) {
        throw 'initializeCloudItemUtilities() must be called before calling this method!';
    }
}
// Factory method for CloudItem instances.
function createCloudItem(id, type, name, extension, modifiedAt, path) {
    confirmInitialization();
    var displayExtension = (extension !== '') ? "." + extension : Localize_1.Messages.file(); // because we don't know what else to display
    switch (type) {
        case CloudItemTypes_1.CloudItemType.File:
            if (isSupportedFileType(extension)) {
                return {
                    canBeSelected: true,
                    displayAsEnabled: true,
                    displayKind: displayExtension,
                    extension: extension,
                    icon: Icons_1.EnabledFileIcon,
                    id: id,
                    modifiedAt: modifiedAt,
                    name: name,
                    path: path,
                    type: type,
                };
            }
            break;
        case CloudItemTypes_1.CloudItemType.Folder:
            return {
                canBeSelected: true,
                displayAsEnabled: true,
                displayKind: Localize_1.Messages.folder(),
                extension: extension,
                icon: Icons_1.FolderIcon,
                id: id,
                modifiedAt: modifiedAt,
                name: name,
                path: path,
                type: type,
            };
        default:
            break;
    }
    return {
        canBeSelected: false,
        displayAsEnabled: false,
        displayKind: displayExtension,
        extension: extension,
        icon: Icons_1.DisabledFileIcon,
        id: id,
        modifiedAt: modifiedAt,
        name: name,
        path: path,
        type: type,
    };
}
exports.createCloudItem = createCloudItem;
// Factory method for BasicCloudItem instances.
function createBasicCloudItem(item) {
    return {
        id: item.id,
        name: item.name,
        type: item.type,
    };
}
exports.createBasicCloudItem = createBasicCloudItem;
// Determine the extension for the (file) name.
function determineExtension(type, name) {
    if (type === CloudItemTypes_1.CloudItemType.Folder) {
        return '';
    }
    else {
        var fileNameParts = name.split('.');
        if (fileNameParts.length === 1) {
            // No extension marker, so no extension to display.
            return '';
        }
        if (fileNameParts[fileNameParts.length - 1].length === 0) {
            // Extension marker but no extension to display.
            return '';
        }
        if (fileNameParts.length > 1 && fileNameParts[0].length === 0) {
            // The file name starts with a '.', e.g., '.htaccess', so no
            // extension to display.
            return '';
        }
        return "" + fileNameParts[fileNameParts.length - 1];
    }
}
exports.determineExtension = determineExtension;
// Initialize this module.
function initializeCloudItemUtilities(supportedFileTypes) {
    // We explicitly don't guard against being instantiated multiple times - if we
    // are it's no big deal, and preventing multiple instantiations vastly complicates
    // unit tests because they have to go through contortions to ensure just a single
    // instantiation.
    // Step 1: Explicitly clear our expanded list of extensions, so that unit tests can
    // reset the supported extensions.
    allSupportedFileTypeExtensions = [];
    // Step 2: Expand the file-category==>extension map to a single list of extensions,
    // so we don't have to do this every time we need to determine whether a particular
    // extension is supported.
    Object.keys(supportedFileTypes).forEach(function (fileType) {
        allSupportedFileTypeExtensions = allSupportedFileTypeExtensions.concat(supportedFileTypes[fileType]);
    });
}
exports.initializeCloudItemUtilities = initializeCloudItemUtilities;
// Determine whether the cloud item is of a type the Cloud File
// Connector supports retrieving data from.
function isSupportedFileType(extension) {
    confirmInitialization();
    if (extension === '') {
        return false;
    }
    if (-1 !== allSupportedFileTypeExtensions.indexOf(extension)) {
        return true;
    }
    return false;
}
//# sourceMappingURL=CloudItemUtilities.js.map