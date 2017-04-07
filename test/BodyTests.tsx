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
import { BodyProps, Body } from '../src/components/Body';
import { BodyRow } from '../src/components/BodyRow';
import { DisabledFileIcon, EnabledFileIcon, FolderIcon } from '../src/icons/Icons';
import { CloudItem, CloudItemType } from '../src/types/CloudItemTypes';
import { Row } from '../src/types/DataGridTypes';
import { mount, shallow, ShallowWrapper, ReactWrapper } from 'enzyme';

describe('Body', () => {
  const testFileRows: Row[] = [
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
  const testUnsupportedFileRows: Row[] = [
    { cloudItem: {
      id: '1',
      name: 'Supported',
      type: CloudItemType.File,
      modifiedAt: new Date(),
      canBeSelected: true,
      displayAsEnabled: true,
      displayKind: '',
      extension: '',
      icon: DisabledFileIcon,
      path: []
    } },
    { cloudItem: {
      id: '2',
      name: 'Unsupported',
      type: CloudItemType.File,
      modifiedAt: new Date(),
      canBeSelected: false,
      displayAsEnabled: false,
      displayKind: '',
      extension: '',
      icon: DisabledFileIcon,
      path: []
    } },
  ];
  const testFolderRows: Row[] = [
    { cloudItem: {
      id: '0',
      name: 'FolderA',
      type: CloudItemType.Folder,
      modifiedAt: new Date(),
      canBeSelected: true,
      displayAsEnabled: true,
      displayKind: 'folder',
      extension: '',
      icon: FolderIcon,
      path: []
    } },
    { cloudItem: {
      id: '1',
      name: 'FolderB',
      type: CloudItemType.Folder,
      modifiedAt: new Date(),
      canBeSelected: true,
      displayAsEnabled: true,
      displayKind: 'folder',
      extension: '',
      icon: FolderIcon,
      path: []
    } },
    { cloudItem: {
      id: '2',
      name: 'FolderC',
      type: CloudItemType.Folder,
      modifiedAt: new Date(),
      canBeSelected: true,
      displayAsEnabled: true,
      displayKind: 'folder',
      extension: '',
      icon: FolderIcon,
      path: []
    } },
  ];

  it('should render rows', () => {
    const mockBodyProps = {
      rows: testFileRows,
      onItemSelected: (item: CloudItem) => { return; },
      onFolderOpened: (item: CloudItem) => { return; },
      onConnect: () => { return; }
    };
    const wrapper: ShallowWrapper<BodyProps, {}> = shallow(<Body { ...mockBodyProps } />);
    expect(wrapper.find(BodyRow).length).toBe(3);
  });

  it('should call onItemSelected if a folder is selected', () => {
    const onFolderSelectedSpy: jasmine.Spy = jasmine.createSpy('folder selection spy');
    const mockBodyProps = {
      rows: testFolderRows,
      onItemSelected: (item: CloudItem) => { onFolderSelectedSpy(item); },
      onFolderOpened: (item: CloudItem) => { return; },
      onConnect: () => { return; }
    };
    const wrapper: ReactWrapper<BodyProps, {}> = mount(<Body { ...mockBodyProps } />);
    wrapper.childAt(0).simulate('click');
    expect(onFolderSelectedSpy).toHaveBeenCalled();
  });

  it('should call onFolderOpened if a folder row is double clicked on', () => {
    const onFolderDoubleClickedSpy: jasmine.Spy = jasmine.createSpy('double clicked folder spy');
    const mockBodyProps = {
      rows: testFolderRows,
      onItemSelected: (item: CloudItem) => { return; },
      onFolderOpened: (item: CloudItem) => { onFolderDoubleClickedSpy(item); },
      onConnect: () => { return; }
    };
    const body: ReactWrapper<BodyProps, {}> = mount(<Body { ...mockBodyProps } />);
    body.childAt(0).simulate('doubleclick');
    expect(onFolderDoubleClickedSpy).toHaveBeenCalled();
  });

  it('should call onFolderOpened if folder text is clicked on', () => {
    const onFolderTextClickedSpy: jasmine.Spy = jasmine.createSpy('folder text clicked spy');
    const mockBodyProps = {
      rows: testFolderRows,
      onItemSelected: (item: CloudItem) => { return; },
      onFolderOpened: (item: CloudItem) => { onFolderTextClickedSpy(item); },
      onConnect: () => { return; }
    };
    const body: ReactWrapper<BodyProps, {}> = mount(<Body { ...mockBodyProps } />);
    const bodyCell = body.find(BodyRow).first().find(BodyCell).first();
    const folderText = bodyCell.find('.data-grid-body-cell-value');
    folderText.simulate('click');
    expect(onFolderTextClickedSpy).toHaveBeenCalled();
  });

  it('should call change handler if a supported file is selected', () => {
    const onFileSelectedSpy: jasmine.Spy = jasmine.createSpy('file selection spy');
    const mockBodyProps = {
      rows: testUnsupportedFileRows,
      onItemSelected: (item: CloudItem) => { onFileSelectedSpy(item); },
      onFolderOpened: (item: CloudItem) => { return; },
      onConnect: () => { return; }
    };
    const wrapper: ReactWrapper<BodyProps, {}> = mount(<Body { ...mockBodyProps } />);
    wrapper.childAt(0).simulate('click');
    expect(onFileSelectedSpy).toHaveBeenCalled();
  });

  it('should not call change handler if an unsupported file is selected', () => {
    const onFileSelectedSpy: jasmine.Spy = jasmine.createSpy('file selection spy');
    const mockBodyProps = {
      rows: testUnsupportedFileRows,
      onItemSelected: (item: CloudItem) => { onFileSelectedSpy(item); },
      onFolderOpened: (item: CloudItem) => { return; },
      onConnect: () => { return; }
    };
    const wrapper: ReactWrapper<BodyProps, {}> = mount(<Body { ...mockBodyProps } />);
    wrapper.childAt(1).simulate('click');
    expect(onFileSelectedSpy).not.toHaveBeenCalled();
  });

  it('should highlight the row when a non-highlighted file is clicked', () => {
    const mockBodyProps = {
      rows: testFileRows,
      onItemSelected: (item: CloudItem) => { return; },
      onFolderOpened: (item: CloudItem) => { return; },
      onConnect: () => { return; }
    };
    const wrapper: ReactWrapper<BodyProps, {}> = mount(<Body { ...mockBodyProps } />);
    wrapper.childAt(0).simulate('click');
    expect(wrapper.childAt(0).props().currentHighlightedRow).toBe(testFileRows[0]);
  });

  it('should not unhighlight the row when an already highlighted file is clicked', () => {
    const mockBodyProps = {
      rows: testFileRows,
      onItemSelected: (item: CloudItem) => { return; },
      onFolderOpened: (item: CloudItem) => { return; },
      onConnect: () => { return; }
    };
    const wrapper: ReactWrapper<BodyProps, {}> = mount(<Body { ...mockBodyProps } />);
    wrapper.childAt(0).simulate('click');
    wrapper.childAt(0).simulate('click');
    expect(wrapper.childAt(0).props().currentHighlightedRow).toBe(testFileRows[0]);
  });

  it('should highlight the row when a non-highlighted folder is clicked', () => {
    const mockBodyProps = {
      rows: testFolderRows,
      onItemSelected: (item: CloudItem) => { return; },
      onFolderOpened: (item: CloudItem) => { return; },
      onConnect: () => { return; }
    };
    const wrapper: ReactWrapper<BodyProps, {}> = mount(<Body { ...mockBodyProps } />);
    wrapper.childAt(0).simulate('click');
    expect(wrapper.childAt(0).props().currentHighlightedRow).toBe(testFolderRows[0]);
  });

  it('should not unhighlight the row when an already highlighted folder is clicked', () => {
    const mockBodyProps = {
      rows: testFolderRows,
      onItemSelected: (item: CloudItem) => { return; },
      onFolderOpened: (item: CloudItem) => { return; },
      onConnect: () => { return; }
    };
    const wrapper: ReactWrapper<BodyProps, {}> = mount(<Body { ...mockBodyProps } />);
    wrapper.childAt(0).simulate('click');
    wrapper.childAt(0).simulate('click');
    expect(wrapper.childAt(0).props().currentHighlightedRow).toBe(testFolderRows[0]);
  });

  it('should unhighlight the old row when a new file is clicked', () => {
    const mockBodyProps = {
      rows: testFileRows,
      onItemSelected: (item: CloudItem) => { return; },
      onFolderOpened: (item: CloudItem) => { return; },
      onConnect: () => { return; }
    };
    const wrapper: ReactWrapper<BodyProps, {}> = mount(<Body { ...mockBodyProps } />);
    wrapper.childAt(0).simulate('click');
    wrapper.childAt(1).simulate('click');
    expect(wrapper.childAt(0).props().currentHighlightedRow).toBe(testFileRows[1]);
  });

  it('should unhighlight the old row when a new folder is clicked', () => {
    const mockBodyProps = {
      rows: testFolderRows,
      onItemSelected: (item: CloudItem) => { return; },
      onFolderOpened: (item: CloudItem) => { return; },
      onConnect: () => { return; }
    };
    const wrapper: ReactWrapper<BodyProps, {}> = mount(<Body { ...mockBodyProps } />);
    wrapper.childAt(0).simulate('click');
    wrapper.childAt(1).simulate('click');
    expect(wrapper.childAt(0).props().currentHighlightedRow).toBe(testFolderRows[1]);
  });

});
