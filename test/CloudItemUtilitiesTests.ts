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

import { createCloudItem, determineExtension, initializeCloudItemUtilities } from '../src/utils/CloudItemUtilities';
import { BasicCloudItem, CloudItemType } from '../src/types/CloudItemTypes';
import { DisabledFileIcon, EnabledFileIcon, FolderIcon } from '../src/icons/Icons';
import { Messages } from '../src/codegen/Localize';

describe('CloudItemUtilities', () => {
  const displayKindFile = Messages.file();
  const displayKindFolder = Messages.folder();

  describe('initializeCloudItemUtilities', () => {
    it('should clear supported file extensions when file type map is empty', () => {
      initializeCloudItemUtilities({ 'test': ['extension'] });
      initializeCloudItemUtilities({});
      let createdItem = createCloudItem(
        'id',
        CloudItemType.File,
        'file.extension',
        'extension',
        new Date(),
        []);
      expect(createdItem.canBeSelected).toBe(false);
    });
  });

  describe('createCloudItem', () => {
    it('should return a folder object for an item of type folder', () => {
      const id: string = 'id-folder';
      const name: string = 'name-folder';
      const extension: string = '';
      const modifiedAt: Date = new Date('12 May 2018');
      const path: BasicCloudItem[] = [{id: 'one-id', name: 'one-name', type: CloudItemType.File}];
      let createdItem = createCloudItem(
        id,
        CloudItemType.Folder,
        name,
        extension,
        modifiedAt,
        path);
      expect(createdItem.canBeSelected).toBe(true);
      expect(createdItem.displayAsEnabled).toBe(true);
      expect(createdItem.displayKind).toBe(displayKindFolder);
      expect(createdItem.extension).toBe(extension);
      expect(createdItem.icon).toBe(FolderIcon);
      expect(createdItem.id).toBe(id);
      expect(createdItem.modifiedAt).toBe(modifiedAt);
      expect(createdItem.name).toBe(name);
      expect(createdItem.path).toBeDefined();
      expect(createdItem.path.length).toBe(1);
      expect(createdItem.path[0].id).toBe(path[0].id);
      expect(createdItem.path[0].name).toBe(path[0].name);
      expect(createdItem.path[0].type).toBe(path[0].type);
      expect(createdItem.type).toBe(CloudItemType.Folder);
    });

    const testNameSupportedTypeNameEndsWithKnownExtension: string = 'should return a file object that is flagged as a supported type for '
      + 'an item of type file whose extension is in the file type map';
    it(testNameSupportedTypeNameEndsWithKnownExtension, () => {
      const id: string = 'id-file-supported';
      const name: string = 'name.extension';
      const extension: string = 'extension';
      const modifiedAt: Date = new Date('18 Dec 2323');
      initializeCloudItemUtilities({ 'test': [extension] });
      let createdItem = createCloudItem(
        id,
        CloudItemType.File,
        name,
        extension,
        modifiedAt,
        []);
      expect(createdItem.canBeSelected).toBe(true);
      expect(createdItem.displayAsEnabled).toBe(true);
      expect(createdItem.displayKind).toBe('.extension');
      expect(createdItem.extension).toBe(extension);
      expect(createdItem.icon).toBe(EnabledFileIcon);
      expect(createdItem.id).toBe(id);
      expect(createdItem.modifiedAt).toBe(modifiedAt);
      expect(createdItem.name).toBe(name);
      expect(createdItem.path).toBeDefined();
      expect(createdItem.path.length).toBe(0);
      expect(createdItem.type).toBe(CloudItemType.File);
    });

    const testNameUnsupportedTypeNameEndsWithUnknownExtension: string = 'should return a file object that is flagged as an unsupported '
      + 'type for an item of type file whose extension is not in the file type map';
    it(testNameUnsupportedTypeNameEndsWithUnknownExtension, () => {
      const id: string = 'id-file-unsupported';
      const name: string = 'name.unsupported';
      const extension: string = 'unsupported';
      const modifiedAt: Date = new Date('7 May 2000');
      initializeCloudItemUtilities({ 'test': ['extension'] });
      let createdItem = createCloudItem(
        id,
        CloudItemType.File,
        name,
        extension,
        modifiedAt,
        []);
      expect(createdItem.canBeSelected).toBe(false);
      expect(createdItem.displayAsEnabled).toBe(false);
      expect(createdItem.displayKind).toBe('.unsupported');
      expect(createdItem.extension).toBe(extension);
      expect(createdItem.icon).toBe(DisabledFileIcon);
      expect(createdItem.id).toBe(id);
      expect(createdItem.modifiedAt).toBe(modifiedAt);
      expect(createdItem.name).toBe(name);
      expect(createdItem.path).toBeDefined();
      expect(createdItem.path.length).toBe(0);
      expect(createdItem.type).toBe(CloudItemType.File);
    });

    const testNameUnsupportedTypeNameEndsWithNoExtension: string = 'should return a file object that is flagged as an unsupported '
      + 'type for an item of type file whose extension is blank';
    it(testNameUnsupportedTypeNameEndsWithNoExtension, () => {
      const id: string = 'id-file-unsupported2';
      const name: string = 'name';
      const extension: string = '';
      const modifiedAt: Date = new Date('7 May 2000');
      initializeCloudItemUtilities({ 'test': ['extension'] });
      let createdItem = createCloudItem(
        id,
        CloudItemType.File,
        name,
        extension,
        modifiedAt,
        []);
      expect(createdItem.canBeSelected).toBe(false);
      expect(createdItem.displayAsEnabled).toBe(false);
      expect(createdItem.displayKind).toBe(displayKindFile);
      expect(createdItem.extension).toBe(extension);
      expect(createdItem.icon).toBe(DisabledFileIcon);
      expect(createdItem.id).toBe(id);
      expect(createdItem.modifiedAt).toBe(modifiedAt);
      expect(createdItem.name).toBe(name);
      expect(createdItem.path).toBeDefined();
      expect(createdItem.path.length).toBe(0);
      expect(createdItem.type).toBe(CloudItemType.File);
    });

    it('should return an unknown object that is flagged as an unsupported type for an item of unknown type', () => {
      const id: string = 'id-unknown type';
      const name: string = 'name.extension';
      const extension: string = 'extension';
      const modifiedAt: Date = new Date('8 Mar 2737');
      const type = CloudItemType.Unknown;
      initializeCloudItemUtilities({ 'test': ['extension'] });
      let createdItem = createCloudItem(
        id,
        type,
        name,
        extension,
        modifiedAt,
        []);
      expect(createdItem.canBeSelected).toBe(false);
      expect(createdItem.displayAsEnabled).toBe(false);
      expect(createdItem.displayKind).toBe('.extension');
      expect(createdItem.extension).toBe(extension);
      expect(createdItem.icon).toBe(DisabledFileIcon);
      expect(createdItem.id).toBe(id);
      expect(createdItem.modifiedAt).toBe(modifiedAt);
      expect(createdItem.name).toBe(name);
      expect(createdItem.path).toBeDefined();
      expect(createdItem.path.length).toBe(0);
      expect(createdItem.type).toBe(type);
    });

    const testNameFileTypeMapContainsOneFileTypeOneExtension: string = 'should create file objects correctly flagged as '
      + 'supported/unsupported when the file type map contains one file type with one extension';
    it(testNameFileTypeMapContainsOneFileTypeOneExtension, () => {
      initializeCloudItemUtilities({ 'test': ['extension'] });
      let supportedItem = createCloudItem(
        'id',
        CloudItemType.File,
        'file.extension',
        'extension',
        new Date(),
        []);
      let unsupportedItem = createCloudItem(
        'id',
        CloudItemType.File,
        'file.unsupported',
        'unsupported',
        new Date(),
        []);
      expect(supportedItem.canBeSelected).toBe(true);
      expect(supportedItem.displayAsEnabled).toBe(true);
      expect(unsupportedItem.canBeSelected).toBe(false);
      expect(unsupportedItem.displayAsEnabled).toBe(false);
    });

    const testNameFileTypeMapContainsOneFileTypeTwoExtensions: string = 'should create file objects correctly flagged as '
      + 'supported/unsupported when the file type map contains one file type with two extensions';
    it(testNameFileTypeMapContainsOneFileTypeTwoExtensions, () => {
      initializeCloudItemUtilities({ 'test': ['one', 'two'] });
      let supportedItemOne = createCloudItem(
        'id',
        CloudItemType.File,
        'file.one',
        'one',
        new Date(),
        []);
      let supportedItemTwo = createCloudItem(
        'id',
        CloudItemType.File,
        'file.two',
        'two',
        new Date(),
        []);
      let unsupportedItem = createCloudItem(
        'id',
        CloudItemType.File,
        'file.unsupported',
        'unsupported',
        new Date(),
        []);
      expect(supportedItemOne.canBeSelected).toBe(true);
      expect(supportedItemOne.displayAsEnabled).toBe(true);
      expect(supportedItemTwo.canBeSelected).toBe(true);
      expect(supportedItemTwo.displayAsEnabled).toBe(true);
      expect(unsupportedItem.canBeSelected).toBe(false);
      expect(unsupportedItem.displayAsEnabled).toBe(false);
    });

    const testNameFileTypeMapContainsOneFileTypeDuplicationExtensions: string = 'should create file objects correctly flagged as '
      + 'supported/unsupported when the file type map contains one file type with duplication extensions';
    it(testNameFileTypeMapContainsOneFileTypeDuplicationExtensions, () => {
      const extension = 'extension';
      initializeCloudItemUtilities({ 'test': [extension, extension] });
      let supportedItem = createCloudItem(
        'id',
        CloudItemType.File,
        `file.${extension}`,
        extension,
        new Date(),
        []);
      let unsupportedItem = createCloudItem(
        'id',
        CloudItemType.File,
        'file.unsupported',
        'unsupported',
        new Date(),
        []);
      expect(supportedItem.canBeSelected).toBe(true);
      expect(supportedItem.displayAsEnabled).toBe(true);
      expect(unsupportedItem.canBeSelected).toBe(false);
      expect(unsupportedItem.displayAsEnabled).toBe(false);
    });

    const testNameFileTypeMapContainsMultipleFileTypesTwoExtensions: string = 'should create file objects correctly flagged as '
      + 'supported/unsupported when the file type map contains multiple file types each with two extensions';
    it(testNameFileTypeMapContainsMultipleFileTypesTwoExtensions, () => {
      initializeCloudItemUtilities({ 'english': ['one', 'two'], 'portuguese': ['um', 'dois'] });
      let supportedItemEnglishOne = createCloudItem(
        'id',
        CloudItemType.File,
        'file.one',
        'one',
        new Date(),
        []);
      let supportedItemEnglishTwo = createCloudItem(
        'id',
        CloudItemType.File,
        'file.two',
        'two',
        new Date(),
        []);
      let supportedItemPortugueseOne = createCloudItem(
        'id',
        CloudItemType.File,
        'file.um',
        'um',
        new Date(),
        []);
      let supportedItemPortugueseTwo = createCloudItem(
        'id',
        CloudItemType.File,
        'file.dois',
        'dois',
        new Date(),
        []);
      let unsupportedItem = createCloudItem(
        'id',
        CloudItemType.File,
        'file.unsupported',
        'unsupported',
        new Date(),
        []);
      expect(supportedItemEnglishOne.canBeSelected).toBe(true);
      expect(supportedItemEnglishOne.displayAsEnabled).toBe(true);
      expect(supportedItemEnglishTwo.canBeSelected).toBe(true);
      expect(supportedItemEnglishTwo.displayAsEnabled).toBe(true);
      expect(supportedItemPortugueseOne.canBeSelected).toBe(true);
      expect(supportedItemPortugueseOne.displayAsEnabled).toBe(true);
      expect(supportedItemPortugueseTwo.canBeSelected).toBe(true);
      expect(supportedItemPortugueseTwo.displayAsEnabled).toBe(true);
      expect(unsupportedItem.canBeSelected).toBe(false);
      expect(unsupportedItem.displayAsEnabled).toBe(false);
    });
  });

  describe('determineExtension', () => {
    it('should return an empty string if the item is a folder', () => {
      const name = 'folder.extension';
      const type = CloudItemType.Folder;
      const extension = determineExtension(type, name);
      expect(extension).toBe('');
    });

    it('should return an empty string if the filename does not contain an extension', () => {
      const name = 'filename';
      const type = CloudItemType.File;
      const extension = determineExtension(type, name);
      expect(extension).toBe('');
    });

    it('should return an empty string if the filename contains a trailing dot', () => {
      const name = 'filename.';
      const type = CloudItemType.File;
      const extension = determineExtension(type, name);
      expect(extension).toBe('');
    });

    it('should return an empty string if the filename begins with a dot', () => {
      const name = '.extension';
      const type = CloudItemType.Folder;
      const extension = determineExtension(type, name);
      expect(extension).toBe('');
    });

    it('should return an empty string if the filename begins with a dot and has multiple extensions', () => {
      const name = '.extension1.extension2';
      const type = CloudItemType.Folder;
      const extension = determineExtension(type, name);
      expect(extension).toBe('');
    });

    it('should return the file\'s extension if the filename has one extension', () => {
      const name = 'file.extension';
      const type = CloudItemType.File;
      const extension = determineExtension(type, name);
      expect(extension).toBe('extension');
    });

    it('should return the file\'s extension if the filename has multiple extensions', () => {
      const name = 'file.extension1.extension2';
      const type = CloudItemType.File;
      const extension = determineExtension(type, name);
      expect(extension).toBe('extension2');
    });
  });
});
