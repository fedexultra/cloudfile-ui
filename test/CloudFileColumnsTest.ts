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
import { Column, Row } from '../src/types/DataGridTypes';
import { EmptyIcon } from '../src/icons/Icons';
import { getCloudFileColumns } from '../src/constants/CloudFileColumns';
import { Messages } from '../src/codegen/Localize';
import { TabStyles } from 'shared-widgets';
import { CloudItemType } from '../src/types/CloudItemTypes';
import { EnabledFileIcon } from '../src/icons/Icons';

describe('CloudFileColums', () => {
    const row: Row = {
        cloudItem: { id: '1', name: 'Banana', type: CloudItemType.File, modifiedAt: new Date(2013, 11, 8),
        canBeSelected: true, displayAsEnabled: true, displayKind: '.xls', extension: 'xls', icon: EnabledFileIcon, path: [] }
    };

    it('should have the correct settings for the "Name" column', () => {
        const column: Column = getCloudFileColumns()[0];
        expect(column.id).toBe(0);
        expect(column.title).toBe(Messages.name());
        expect(column.width).toBe('auto');
        expect(column.hasBorder).toBe(false);
        expect(column.getIconFromRow(row)).toBe(row.cloudItem.icon);
        expect(column.getCellFromRow(row)).toBe(row.cloudItem.name);
    });

    it('should have the correct settings for the "Kind" column', () => {
        const column: Column = getCloudFileColumns()[1];
        expect(column.id).toBe(1);
        expect(column.title).toBe(Messages.kind());
        expect(column.width).toBe(`${TabStyles && TabStyles.Sizing && (TabStyles.Sizing.BaseUnit || 6) * 15}px`);
        expect(column.hasBorder).toBe(true);
        expect(column.getIconFromRow(row)).toBe(EmptyIcon);
        expect(column.getCellFromRow(row)).toBe(row.cloudItem.displayKind);
    });

    it('should have the correct settings for the "modifiedAt" column', () => {
        const column: Column = getCloudFileColumns()[2];
        expect(column.id).toBe(2);
        expect(column.title).toBe(Messages.lastModifiedOn());
        expect(column.width).toBe(`${TabStyles && TabStyles.Sizing && (TabStyles.Sizing.BaseUnit || 6) * 30}px`);
        expect(column.hasBorder).toBe(false);
        expect(column.getIconFromRow(row)).toBe(EmptyIcon);
        expect(column.getCellFromRow(row)).toBe('Dec 8, 2013');
    });
});
