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

import { BodyCell } from '../src/components/BodyCell';
import { BodyRowProps, BodyRow } from '../src/components/BodyRow';
import { DisabledFileIcon, EnabledFileIcon, FolderIcon } from '../src/icons/Icons';
import { CloudItemType } from '../src/types/CloudItemTypes';
import { Row } from '../src/types/DataGridTypes';
import { mount, shallow, ReactWrapper, ShallowWrapper } from 'enzyme';

describe('Body row', () => {

  const testFileRow: Row = {
    cloudItem: {
      id: '1',
      name: 'PersonA.ext',
      type: CloudItemType.File,
      modifiedAt: new Date(),
      canBeSelected: true,
      displayAsEnabled: true,
      displayKind: '.ext',
      extension: 'ext',
      icon: EnabledFileIcon,
      path: []
    }
  };
  const testFolderRow: Row = {
    cloudItem: {
      id: '1',
      name: 'FolderA',
      type: CloudItemType.Folder,
      modifiedAt: new Date(),
      canBeSelected: true,
      displayAsEnabled: true,
      displayKind: '',
      extension: '',
      icon: FolderIcon,
      path: []
    }
  };

  it('should render cells', () => {
    const mockBodyRowProps = {
      row: testFileRow,
      onConnect: () => { return; },
      onFolderOpened: (rowId: number) => { return; },
      onRowSelected: (rowId: number) => { return; },
      rowId: 0,
      selected: true
    };
    const wrapper: ShallowWrapper<BodyRowProps, {}> = shallow(<BodyRow { ...mockBodyRowProps } />);

    // Number of body cells is based on the number of CloudFileColumns
    expect(wrapper.find(BodyCell).length).toBe(3);
  });

  it('should call onRowSelected if a supported file is selected', () => {
    const onRowSelectedSpy: jasmine.Spy = jasmine.createSpy('handle click spy');
    const mockBodyRowProps = {
      row: testFileRow,
      onConnect: () => { return; },
      onFolderOpened: (rowId: number) => { return; },
      onRowSelected: (rowId: number) => { onRowSelectedSpy(rowId); },
      rowId: 0,
      selected: true
    };
    const wrapper: ReactWrapper<BodyRowProps, {}> = mount (<BodyRow { ...mockBodyRowProps } />);
    wrapper.simulate('click');
    expect(onRowSelectedSpy).toHaveBeenCalled();
  });

  it('should call onRowSelected if an unsupported file is selected', () => {
    const testUnsupportedFileRow: Row = {
      cloudItem: {
        id: '1',
        name: 'PersonA.unsupported',
        type: CloudItemType.File,
        modifiedAt: new Date(),
        canBeSelected: false,
        displayAsEnabled: false,
        displayKind: '.unsupported',
        extension: 'unsupported',
        icon: DisabledFileIcon,
        path: []
      }
    };
    const onRowSelectedSpy: jasmine.Spy = jasmine.createSpy('handle click spy');
    const mockBodyRowProps = {
      row: testUnsupportedFileRow,
      onConnect: () => { return; },
      onFolderOpened: (rowId: number) => { return; },
      onRowSelected: (rowId: number) => { onRowSelectedSpy(rowId); },
      rowId: 0,
      selected: true
    };
    const wrapper: ReactWrapper<BodyRowProps, {}> = mount (<BodyRow { ...mockBodyRowProps } />);
    wrapper.simulate('click');
    expect(onRowSelectedSpy).toHaveBeenCalled();
  });

  it('should call onRowSelected if a folder is selected', () => {
    const onRowSelectedSpy: jasmine.Spy = jasmine.createSpy('handle click spy');
    const mockBodyRowProps = {
      row: testFolderRow,
      onConnect: () => { return; },
      onFolderOpened: (rowId: number) => { return; },
      onRowSelected: (rowId: number) => { onRowSelectedSpy(rowId); },
      rowId: 0,
      selected: false
    };
    const wrapper: ReactWrapper<BodyRowProps, {}> = mount (<BodyRow { ...mockBodyRowProps } />);
    wrapper.simulate('click');
    expect(onRowSelectedSpy).toHaveBeenCalled();
  });

  it('should call onFolderOpened if a folder row is double clicked on', () => {
    const onFolderOpenedSpy: jasmine.Spy = jasmine.createSpy('open folder spy');
    const mockBodyRowProps = {
      row: testFolderRow,
      onConnect: () => { return; },
      onFolderOpened: (rowId: number) => { onFolderOpenedSpy(rowId); },
      onRowSelected: (rowId: number) => { return; },
      rowId: 0,
      selected: false
    };
    const bodyRow: ReactWrapper<BodyRowProps, {}> = mount (<BodyRow { ...mockBodyRowProps } />);
    bodyRow.simulate('doubleclick');
    expect(onFolderOpenedSpy).toHaveBeenCalled();
  });

});
