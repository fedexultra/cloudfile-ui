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

import { BasicCloudItem, CloudItem, CloudItemType } from '../types/CloudItemTypes';
import { DisabledFileIcon, EnabledFileIcon, FolderIcon } from '../icons/Icons';
import { FileTypeMap } from '../types/ShimTypes';
import { Messages } from '../codegen/Localize';

// All extensions supported by every file type, expanded out into
// a single array, e.g., ['ext', 'extension', 'mp3', 'flac'].
let allSupportedFileTypeExtensions: string[];

// Verify initializeCloudItemUtilities has been called.
function confirmInitialization(): void {
  if ([] === allSupportedFileTypeExtensions) { throw 'initializeCloudItemUtilities() must be called before calling this method!'; }
}

// Factory method for CloudItem instances.
export function createCloudItem(id: string, type: CloudItemType, name: string, extension: string, modifiedAt: Date,
                                path: BasicCloudItem[]): CloudItem {
  confirmInitialization();
  let displayExtension = (extension !== '') ? `.${extension}` : Messages.file(); // because we don't know what else to display
  switch (type) {
    case CloudItemType.File:
      if (isSupportedFileType(extension)) {
        return <CloudItem> {
          canBeSelected: true,
          displayAsEnabled: true,
          displayKind: displayExtension,
          extension: extension,
          icon: EnabledFileIcon,
          id: id,
          modifiedAt: modifiedAt,
          name: name,
          path: path,
          type: type,
        };
      }

      break;
    case CloudItemType.Folder:
      return <CloudItem> {
        canBeSelected: true,
        displayAsEnabled: true,
        displayKind: Messages.folder(),
        extension: extension,
        icon: FolderIcon,
        id: id,
        modifiedAt: modifiedAt,
        name: name,
        path: path,
        type: type,
      };
    default:
      break;
  }

  return <CloudItem> {
    canBeSelected: false,
    displayAsEnabled: false,
    displayKind: displayExtension,
    extension: extension,
    icon: DisabledFileIcon,
    id: id,
    modifiedAt: modifiedAt,
    name: name,
    path: path,
    type: type,
  };
}

// Factory method for BasicCloudItem instances.
export function createBasicCloudItem(item: CloudItem): BasicCloudItem {
  return <BasicCloudItem> {
    id: item.id,
    name: item.name,
    type: item.type,
  };
}

// Determine the extension for the (file) name.
export function determineExtension(type: CloudItemType, name: string): string {
  if (type === CloudItemType.Folder) {
      return '';
  } else {
    const fileNameParts = name.split('.');
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
    return `${fileNameParts[fileNameParts.length - 1]}`;
  }
}

// Initialize this module.
export function initializeCloudItemUtilities(supportedFileTypes: FileTypeMap): void {
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
  Object.keys(supportedFileTypes).forEach(fileType => {
    allSupportedFileTypeExtensions = allSupportedFileTypeExtensions.concat(supportedFileTypes[fileType]);
  });
}

// Determine whether the cloud item is of a type the Cloud File
// Connector supports retrieving data from.
function isSupportedFileType(extension: string): boolean {
  confirmInitialization();

  if (extension === '') { return false; }

  if (-1 !== allSupportedFileTypeExtensions.indexOf(extension)) {
    return true;
  }

  return false;
}
