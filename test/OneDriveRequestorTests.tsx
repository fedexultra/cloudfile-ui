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

import 'core-js/es6/promise';
import 'isomorphic-fetch';
import * as FetchMock from 'fetch-mock';

import { CloudItem, CloudItemType } from '../src/types/CloudItemTypes';
import { DisabledFileIcon, EnabledFileIcon, FolderIcon } from '../src/icons/Icons';
import { DriveTypeResponse, OneDriveItem, OneDriveRequestor, OneDriveFolder } from '../src/requestors/OneDriveRequestor';
import { initializeCloudItemUtilities } from '../src/utils/CloudItemUtilities';
import { OneDrive } from '../src/providers/OneDrive';
import { ProviderInfo } from '../src/providers/ProviderInfo';
import { testCloudItemsAreEqual } from './CloudItemUtilitiesTests';

describe('OneDrive Requestor', () => {

  const providerInfo: ProviderInfo = new OneDrive();
  const requestor: OneDriveRequestor = new OneDriveRequestor({accessToken: '', userId: ''}, providerInfo);

  afterEach(() => FetchMock.restore);

  describe('enumerateItems', () => {

    const items: OneDriveItem[] = [
      {
        name: 'TestA.xlsx',
        file: {},
        lastModifiedDateTime: '2017-04-16T21:54:51.307Z',
        parentReference: { path: '/drive/root:/Documents' }
      },
      {
        name: 'TestB',
        folder: {},
        lastModifiedDateTime: '2016-08-22T12:17:33.307Z',
        parentReference: { path: '/drive/root:/Documents' }
      },
      {
        name: 'TestC.csv',
        file: {},
        lastModifiedDateTime: '2017-02-14T03:55:12.307Z',
        parentReference: { path: '/drive/root:/Documents' }
      }
    ];

    const items2: OneDriveItem[] = [
      {
        name: 'TestD.xls',
        file: {},
        lastModifiedDateTime: '2013-01-09T11:29:36.307Z',
        parentReference: { path: '/drive/root:/Documents' }
      }
    ];

    const items3: OneDriveItem[] = [
      {
        name: 'TestE.csv',
        file: {},
        lastModifiedDateTime: '2017-03-16T03:14:19.307Z',
        parentReference: { path: '/drive/root:/Documents' }
      },
      {
        name: 'TestF',
        folder: {},
        lastModifiedDateTime: '2015-11-11T12:12:10.307Z',
        parentReference: { path: '/drive/root:/Documents' }
      }
    ];

    const expected: CloudItem[] = [
      {
        id: '/drive/root:/Documents/TestA.xlsx',
        name: 'TestA.xlsx',
        type: CloudItemType.File,
        modifiedAt: new Date('2017-04-16T21:54:51.307Z'),
        canBeSelected: false,
        displayAsEnabled: false,
        displayKind: '.xlsx',
        extension: 'xlsx',
        icon: DisabledFileIcon,
        path: [{ id: 'root', name: 'OneDrive', type: CloudItemType.Folder },
               { id: '/drive/root:/Documents', name: 'Documents', type: CloudItemType.Folder }]
      },
      {
        id: '/drive/root:/Documents/TestB',
        name: 'TestB',
        type: CloudItemType.Folder,
        modifiedAt: new Date('2016-08-22T12:17:33.307Z'),
        canBeSelected: true,
        displayAsEnabled: true,
        displayKind: 'folder',
        extension: '',
        icon: FolderIcon,
        path: [{ id: 'root', name: 'OneDrive', type: CloudItemType.Folder },
               { id: '/drive/root:/Documents', name: 'Documents', type: CloudItemType.Folder }]
      },
      {
        id: '/drive/root:/Documents/TestC.csv',
        name: 'TestC.csv',
        type: CloudItemType.File,
        modifiedAt: new Date('2017-02-14T03:55:12.307Z'),
        canBeSelected: true,
        displayAsEnabled: true,
        displayKind: '.csv',
        extension: 'csv',
        icon: EnabledFileIcon,
        path: [{ id: 'root', name: 'OneDrive', type: CloudItemType.Folder },
               { id: '/drive/root:/Documents', name: 'Documents', type: CloudItemType.Folder }]
      }
    ];

    const expectedPaginated: CloudItem[] = [
      ...expected,
      {
        id: '/drive/root:/Documents/TestD.xls',
        name: 'TestD.xls',
        type: CloudItemType.File,
        modifiedAt: new Date('2013-01-09T11:29:36.307Z'),
        canBeSelected: false,
        displayAsEnabled: false,
        displayKind: '.xls',
        extension: 'xls',
        icon: DisabledFileIcon,
        path: [{ id: 'root', name: 'OneDrive', type: CloudItemType.Folder },
               { id: '/drive/root:/Documents', name: 'Documents', type: CloudItemType.Folder }]
      },
      {
        id: '/drive/root:/Documents/TestE.csv',
        name: 'TestE.csv',
        type: CloudItemType.File,
        modifiedAt: new Date('2017-03-16T03:14:19.307Z'),
        canBeSelected: true,
        displayAsEnabled: true,
        displayKind: '.csv',
        extension: 'csv',
        icon: EnabledFileIcon,
        path: [{ id: 'root', name: 'OneDrive', type: CloudItemType.Folder },
               { id: '/drive/root:/Documents', name: 'Documents', type: CloudItemType.Folder }]
      },
      {
        id: '/drive/root:/Documents/TestF',
        name: 'TestF',
        type: CloudItemType.Folder,
        modifiedAt: new Date('2015-11-11T12:12:10.307Z'),
        canBeSelected: true,
        displayAsEnabled: true,
        displayKind: 'folder',
        extension: '',
        icon: FolderIcon,
        path: [{ id: 'root', name: 'OneDrive', type: CloudItemType.Folder },
               { id: '/drive/root:/Documents', name: 'Documents', type: CloudItemType.Folder }]
      },
    ];

    it('should return correct results', (done) => {
      // Initialize the supported file types
      initializeCloudItemUtilities({ 'text': ['csv'] });

      // Mock out fetch
      const folder: OneDriveFolder = {value: items};
      FetchMock.getOnce('*', {ok: true, ...folder});

      // Validate the output of enumerateItems
      requestor.enumerateItems('').then(response => {
        expect(response.length).toBe(expected.length);

        for (let i = 0; i < response.length; i++) {
          testCloudItemsAreEqual(expected[i], response[i]);
        }

        done();
      });
    });

    it('should return correct paginated results', (done) => {
      // Initialize the supported file types
      initializeCloudItemUtilities({ 'text': ['csv'] });

      // Mock out fetch
      const folder: OneDriveFolder = {value: items, '@odata.nextLink': 'mockUrl'};
      const folder2: OneDriveFolder = {value: items2, '@odata.nextLink': 'mockUrl2'};
      const folder3: OneDriveFolder = {value: items3};
      FetchMock.getOnce('*', {ok: true, ...folder});
      FetchMock.getOnce('mockUrl', {ok: true, ...folder2});
      FetchMock.getOnce('mockUrl2', {ok: true, ...folder3});

      // Validate the output of enumerateItems
      requestor.enumerateItems('').then(response => {
        expect(response.length).toBe(expectedPaginated.length);

        for (let i = 0; i < response.length; i++) {
          testCloudItemsAreEqual(expectedPaginated[i], response[i]);
        }

        done();
      });
    });

  });

  describe('search', () => {

    const items: OneDriveItem[] = [
      {
        name: 'SearchTestA.xlsx',
        file: {},
        lastModifiedDateTime: '2017-04-16T21:54:51.307Z',
        parentReference: { path: '/drive/root:/FolderA/FolderB' }
      },
      {
        name: 'SearchTestB',
        folder: {},
        lastModifiedDateTime: '2016-08-22T12:17:33.307Z',
        parentReference: { path: '/drive/root:/FolderC/FolderD/FolderC' }
      },
      {
        name: 'SearchTestC.csv',
        file: {},
        lastModifiedDateTime: '2017-02-14T03:55:12.307Z',
        parentReference: { path: '/drive/root:/Documents' }
      }
    ];

    const items2: OneDriveItem[] = [
      {
        name: 'SearchTestD.csv',
        file: {},
        lastModifiedDateTime: '2017-03-16T03:14:19.307Z',
        parentReference: { path: '/drive/root:' }
      },
      {
        name: 'SearchTestE.xls',
        file: {},
        lastModifiedDateTime: '2014-05-08T08:18:26.307Z',
        parentReference: { path: '/drive/root:/Documents/FolderE' }
      },
    ];

    const items3: OneDriveItem[] = [
      {
        name: 'SearchTestF',
        folder: {},
        lastModifiedDateTime: '2015-11-11T12:12:10.307Z',
        parentReference: { path: '/drive/root:/Documents' }
      }
    ];

    const expected: CloudItem[] = [
      {
        id: '/drive/root:/FolderA/FolderB/SearchTestA.xlsx',
        name: 'SearchTestA.xlsx',
        type: CloudItemType.File,
        modifiedAt: new Date('2017-04-16T21:54:51.307Z'),
        canBeSelected: true,
        displayAsEnabled: true,
        displayKind: '.xlsx',
        extension: 'xlsx',
        icon: EnabledFileIcon,
        path: [{ id: 'root', name: 'OneDrive', type: CloudItemType.Folder },
               { id: '/drive/root:/FolderA', name: 'FolderA', type: CloudItemType.Folder },
               { id: '/drive/root:/FolderA/FolderB', name: 'FolderB', type: CloudItemType.Folder }]
      },
      {
        id: '/drive/root:/FolderC/FolderD/FolderC/SearchTestB',
        name: 'SearchTestB',
        type: CloudItemType.Folder,
        modifiedAt: new Date('2016-08-22T12:17:33.307Z'),
        canBeSelected: true,
        displayAsEnabled: true,
        displayKind: 'folder',
        extension: '',
        icon: FolderIcon,
        path: [{ id: 'root', name: 'OneDrive', type: CloudItemType.Folder },
               { id: '/drive/root:/FolderC', name: 'FolderC', type: CloudItemType.Folder },
               { id: '/drive/root:/FolderC/FolderD', name: 'FolderD', type: CloudItemType.Folder },
               { id: '/drive/root:/FolderC/FolderD/FolderC', name: 'FolderC', type: CloudItemType.Folder }]
      },
      {
        id: '/drive/root:/Documents/SearchTestC.csv',
        name: 'SearchTestC.csv',
        type: CloudItemType.File,
        modifiedAt: new Date('2017-02-14T03:55:12.307Z'),
        canBeSelected: false,
        displayAsEnabled: false,
        displayKind: '.csv',
        extension: 'csv',
        icon: DisabledFileIcon,
        path: [{ id: 'root', name: 'OneDrive', type: CloudItemType.Folder },
               { id: '/drive/root:/Documents', name: 'Documents', type: CloudItemType.Folder }]
      }
    ];

    const expectedPaginated: CloudItem[] = [
      ...expected,
      {
        id: '/drive/root:/SearchTestD.csv',
        name: 'SearchTestD.csv',
        type: CloudItemType.File,
        modifiedAt: new Date('2017-03-16T03:14:19.307Z'),
        canBeSelected: false,
        displayAsEnabled: false,
        displayKind: '.csv',
        extension: 'csv',
        icon: DisabledFileIcon,
        path: [{ id: 'root', name: 'OneDrive', type: CloudItemType.Folder }]
      },
      {
        id: '/drive/root:/Documents/FolderE/SearchTestE.xls',
        name: 'SearchTestE.xls',
        type: CloudItemType.File,
        modifiedAt: new Date('2014-05-08T08:18:26.307Z'),
        canBeSelected: true,
        displayAsEnabled: true,
        displayKind: '.xls',
        extension: 'xls',
        icon: EnabledFileIcon,
        path: [{ id: 'root', name: 'OneDrive', type: CloudItemType.Folder },
               { id: '/drive/root:/Documents', name: 'Documents', type: CloudItemType.Folder },
               { id: '/drive/root:/Documents/FolderE', name: 'FolderE', type: CloudItemType.Folder }]
      },
      {
        id: '/drive/root:/Documents/SearchTestF',
        name: 'SearchTestF',
        type: CloudItemType.Folder,
        modifiedAt: new Date('2015-11-11T12:12:10.307Z'),
        canBeSelected: true,
        displayAsEnabled: true,
        displayKind: 'folder',
        extension: '',
        icon: FolderIcon,
        path: [{ id: 'root', name: 'OneDrive', type: CloudItemType.Folder },
               { id: '/drive/root:/Documents', name: 'Documents', type: CloudItemType.Folder }]
      },
    ];

    it('should return correct results', (done) => {
      // Initialize the supported file types
      initializeCloudItemUtilities({ 'excel': ['xls', 'xlsx'] });

      // Mock out fetch
      const folder: OneDriveFolder = {value: items};
      FetchMock.getOnce('*', {ok: true, ...folder});

      // Validate the output of search
      requestor.search('').then(response => {
        expect(response.length).toBe(expected.length);

        for (let i = 0; i < response.length; i++) {
          testCloudItemsAreEqual(expected[i], response[i]);
        }

        done();
      });
    });

    it('should return correct paginated results', (done) => {
      // Initialize the supported file types
      initializeCloudItemUtilities({ 'text': ['xls', 'xlsx'] });

      // Mock out fetch
      const folder: OneDriveFolder = {value: items, '@odata.nextLink': 'mockUrl'};
      const folder2: OneDriveFolder = {value: items2, '@odata.nextLink': 'mockUrl2'};
      const folder3: OneDriveFolder = {value: items3};
      FetchMock.getOnce('*', {ok: true, ...folder});
      FetchMock.getOnce('mockUrl', {ok: true, ...folder2});
      FetchMock.getOnce('mockUrl2', {ok: true, ...folder3});

      // Validate the output of search
      requestor.search('').then(response => {
        expect(response.length).toBe(expectedPaginated.length);

        for (let i = 0; i < response.length; i++) {
          testCloudItemsAreEqual(expectedPaginated[i], response[i]);
        }

        done();
      });
    });

  });

  describe('isSearchDisabled', () => {
    it('should return true for business accounts', (done) => {
      // Mock out fetch
      const driveTypeResponse: DriveTypeResponse = {driveType: 'business'};
      FetchMock.getOnce('*', driveTypeResponse);

      // Validate the output of isSearchDisabled
      requestor.isSearchDisabled().then(response => {
        expect(response).toBeTruthy();
        done();
      });
    });

    it('should return false for personal accounts', (done) => {
      // Mock out fetch
      const driveTypeResponse: DriveTypeResponse = {driveType: 'personal'};
      FetchMock.getOnce('*', driveTypeResponse);

      // Validate the output of isSearchDisabled
      requestor.isSearchDisabled().then(response => {
        expect(response).not.toBeTruthy();
        done();
      });
    });

  });

});
