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

import * as React from 'react';
import { Body } from '../src/components/Body';
import { DataGridProps, DataGrid } from '../src/components/DataGrid';
import { EnabledFileIcon } from '../src/icons/Icons';
import { HeaderRow } from '../src/components/HeaderRow';
import { CloudItem, CloudItemType } from '../src/types/CloudItemTypes';
import { Row } from '../src/types/DataGridTypes';
import { shallow, ShallowWrapper } from 'enzyme';
import { SortOrder } from '../src/types/SortOrderTypes';

describe('Data Grid', () => {
  const testRows: Row[] = [
    { cloudItem: {
      id: '1',
      name: 'PersonA',
      type: CloudItemType.File,
      modifiedAt: new Date(),
      canBeSelected: true,
      displayAsEnabled: true,
      displayKind: '',
      extension: '',
      icon: EnabledFileIcon,
      path: []
    } },
    { cloudItem: {
      id: '2',
      name: 'PersonB',
      type: CloudItemType.File,
      modifiedAt: new Date(),
      canBeSelected: true,
      displayAsEnabled: true,
      displayKind: '',
      extension: '',
      icon: EnabledFileIcon,
      path: []
    } },
    { cloudItem: {
      id: '3',
      name: 'PersonC',
      type: CloudItemType.File,
      modifiedAt: new Date(),
      canBeSelected: true,
      displayAsEnabled: true,
      displayKind: '',
      extension: '',
      icon: EnabledFileIcon,
      path: []
    } },
  ];
  const mockDataGridProps = {
    rows: testRows,
    onColumnSelected: (columnId: number) => { return; },
    onItemSelected: (item: CloudItem) => { return; },
    onFolderOpened: (item: CloudItem) => { return; },
    onConnect: () => { return; },
    sortableColumnId: 0,
    sortOrder: SortOrder.ascending
  };

  it('should render a header row', () => {
    const wrapper: ShallowWrapper<DataGridProps, {}> = shallow(<DataGrid { ...mockDataGridProps } />);
    expect(wrapper.find(HeaderRow).length).toBe(1);
  });

  it('should render a body', () => {
      const wrapper: ShallowWrapper<DataGridProps, {}> = shallow(<DataGrid { ...mockDataGridProps } />);
      expect(wrapper.find(Body).length).toBe(1);
  });

});
