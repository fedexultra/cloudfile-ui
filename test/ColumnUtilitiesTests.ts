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

import * as ColumnUtilities from '../src/utils/ColumnUtilities';
import { getCloudFileColumns } from '../src/constants/CloudFileColumns';
import { EnabledFileIcon, FolderIcon } from '../src/icons/Icons';
import { CloudItemType } from '../src/types/CloudItemTypes';
import { Row } from '../src/types/DataGridTypes';
import { SortOrder } from '../src/types/SortOrderTypes';

describe('ColumnUtilities', () => {

  // CloudFileColumns are important to many classes, interfaces, functions, etc.
  // These tests are meant to safe-guard against any unintended column changes.
  describe('getColumn', () => {

    it('should return "Name" column as the first column', () => {
      expect(ColumnUtilities.getColumn(0).id).toBe(getCloudFileColumns()[0].id);
      expect(ColumnUtilities.getColumn(0).title).toBe(getCloudFileColumns()[0].title);
    });

    it('should return "Kind" column as the second column', () => {
      expect(ColumnUtilities.getColumn(1).id).toBe(getCloudFileColumns()[1].id);
      expect(ColumnUtilities.getColumn(1).title).toBe(getCloudFileColumns()[1].title);
    });

    it('should return "Last Modified On" column as the third column', () => {
      expect(ColumnUtilities.getColumn(2).id).toBe(getCloudFileColumns()[2].id);
      expect(ColumnUtilities.getColumn(2).title).toBe(getCloudFileColumns()[2].title);
    });
  });

  describe('getFormattedDateString', () => {
    it('should return "--" when modifiedAt is Date(0)', () => {
      const row: Row = {
        cloudItem: { id: '1', name: 'Banana', type: CloudItemType.File, modifiedAt: new Date(0),
        canBeSelected: true, displayAsEnabled: true, displayKind: '.xls', extension: 'xls', icon: EnabledFileIcon, path: [] }
      };
      expect(ColumnUtilities.getColumn(2).getCellFromRow(row)).toBe('--');
    });

    it('should return the formatted date when modifiedAt is not Date(0)', () => {
      const row: Row = {
        cloudItem: { id: '1', name: 'Banana', type: CloudItemType.File, modifiedAt: new Date(2013, 11, 8),
        canBeSelected: true, displayAsEnabled: true, displayKind: '.xls', extension: 'xls', icon: EnabledFileIcon, path: [] }
      };
      expect(ColumnUtilities.getColumn(2).getCellFromRow(row)).toBe('Dec 8, 2013');
    });
  });

  describe('sortColumn', () => {

    const rows: Row[] = [
      { cloudItem: { id: '1', name: 'Banana', type: CloudItemType.File, modifiedAt: new Date(2014, 12, 12),
        canBeSelected: true, displayAsEnabled: true, displayKind: '.xls', extension: 'xls', icon: EnabledFileIcon, path: [] } },
      { cloudItem: { id: '2', name: 'Apple', type: CloudItemType.File, modifiedAt: new Date(2015, 2, 4),
        canBeSelected: true, displayAsEnabled: true, displayKind: 'file', extension: '', icon: EnabledFileIcon, path: [] } },
      { cloudItem: { id: '3', name: 'Orange', type: CloudItemType.Folder, modifiedAt: new Date(2010, 4, 6),
        canBeSelected: true, displayAsEnabled: true, displayKind: 'folder', extension: '', icon: FolderIcon, path: [] } },
      { cloudItem: { id: '4', name: 'Cherry', type: CloudItemType.File, modifiedAt: new Date(2014, 12, 12),
        canBeSelected: true, displayAsEnabled: true, displayKind: '.txt', extension: 'txt', icon: EnabledFileIcon, path: [] } },
      { cloudItem: { id: '5', name: 'Cherry', type: CloudItemType.File, modifiedAt: new Date(2014, 8, 15),
        canBeSelected: true, displayAsEnabled: true, displayKind: '.xls', extension: 'xls', icon: EnabledFileIcon, path: [] } },
      { cloudItem: { id: '6', name: 'Lime', type: CloudItemType.File, modifiedAt: new Date(2013, 11, 8),
        canBeSelected: true, displayAsEnabled: true, displayKind: 'file', extension: '', icon: EnabledFileIcon, path: [] } },
      { cloudItem: { id: '7', name: 'Grape', type: CloudItemType.Folder, modifiedAt: new Date(2009, 10, 1),
        canBeSelected: true, displayAsEnabled: true, displayKind: 'folder', extension: '', icon: FolderIcon, path: [] } },
    ];

    it('should sort "Name" column in ascending order', () => {
      const sortedRows = ColumnUtilities.sortColumn(rows.slice(), ColumnUtilities.getColumn(0).id, SortOrder.ascending);
      expect(sortedRows[0]).toBe(rows[1]);
      expect(sortedRows[1]).toBe(rows[0]);
      expect(sortedRows[2].cloudItem.name).toBe('Cherry');
      expect(sortedRows[3].cloudItem.name).toBe('Cherry');
      expect(sortedRows[4]).toBe(rows[6]);
      expect(sortedRows[5]).toBe(rows[5]);
      expect(sortedRows[6]).toBe(rows[2]);
    });

    it('should sort "Name" column in descending order', () => {
      const sortedRows = ColumnUtilities.sortColumn(rows.slice(), ColumnUtilities.getColumn(0).id, SortOrder.descending);
      expect(sortedRows[0]).toBe(rows[2]);
      expect(sortedRows[1]).toBe(rows[5]);
      expect(sortedRows[2]).toBe(rows[6]);
      expect(sortedRows[3].cloudItem.name).toBe('Cherry');
      expect(sortedRows[4].cloudItem.name).toBe('Cherry');
      expect(sortedRows[5]).toBe(rows[0]);
      expect(sortedRows[6]).toBe(rows[1]);
    });

    it('should sort "Kind" column in ascending order', () => {
      const sortedRows = ColumnUtilities.sortColumn(rows.slice(), ColumnUtilities.getColumn(1).id, SortOrder.ascending);
      expect(sortedRows[0].cloudItem.displayKind).toBe('folder');
      expect(sortedRows[1].cloudItem.displayKind).toBe('folder');
      expect(sortedRows[2]).toBe(rows[3]);
      expect(sortedRows[3].cloudItem.displayKind).toBe('.xls');
      expect(sortedRows[4].cloudItem.displayKind).toBe('.xls');
      expect(sortedRows[5].cloudItem.displayKind).toBe('file');
      expect(sortedRows[6].cloudItem.displayKind).toBe('file');
    });

    it('should sort "Kind" column in descending order', () => {
      const sortedRows = ColumnUtilities.sortColumn(rows.slice(), ColumnUtilities.getColumn(1).id, SortOrder.descending);
      expect(sortedRows[0].cloudItem.displayKind).toBe('file');
      expect(sortedRows[1].cloudItem.displayKind).toBe('file');
      expect(sortedRows[2].cloudItem.displayKind).toBe('.xls');
      expect(sortedRows[3].cloudItem.displayKind).toBe('.xls');
      expect(sortedRows[4]).toBe(rows[3]);
      expect(sortedRows[5].cloudItem.displayKind).toBe('folder');
      expect(sortedRows[6].cloudItem.displayKind).toBe('folder');
    });

    it('should sort "Last Modified On" column in ascending order', () => {
      const sortedRows = ColumnUtilities.sortColumn(rows.slice(), ColumnUtilities.getColumn(2).id, SortOrder.ascending);
      expect(sortedRows[0]).toBe(rows[6]);
      expect(sortedRows[1]).toBe(rows[2]);
      expect(sortedRows[2]).toBe(rows[5]);
      expect(sortedRows[3]).toBe(rows[4]);
      expect(sortedRows[4].cloudItem.modifiedAt.getTime()).toBe(rows[0].cloudItem.modifiedAt.getTime());
      expect(sortedRows[5].cloudItem.modifiedAt.getTime()).toBe(rows[0].cloudItem.modifiedAt.getTime());
      expect(sortedRows[6]).toBe(rows[1]);
    });

    it('should sort "Last Modified On" column in descending order', () => {
      const sortedRows = ColumnUtilities.sortColumn(rows.slice(), ColumnUtilities.getColumn(2).id, SortOrder.descending);
      expect(sortedRows[0]).toBe(rows[1]);
      expect(sortedRows[1].cloudItem.modifiedAt.getTime()).toBe(rows[0].cloudItem.modifiedAt.getTime());
      expect(sortedRows[2].cloudItem.modifiedAt.getTime()).toBe(rows[0].cloudItem.modifiedAt.getTime());
      expect(sortedRows[3]).toBe(rows[4]);
      expect(sortedRows[4]).toBe(rows[5]);
      expect(sortedRows[5]).toBe(rows[2]);
      expect(sortedRows[6]).toBe(rows[6]);
    });

  });

});
