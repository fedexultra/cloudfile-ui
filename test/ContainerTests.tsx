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
import * as MockPromises from 'mock-promises';
import * as React from 'react';

import { Body } from '../src/components/Body';
import { BodyRow } from '../src/components/BodyRow';
import { Breadcrumb } from '../src/components/Breadcrumb';
import { BreadcrumbItem } from '../src/components/BreadcrumbItem';
import { BasicCloudItem, CloudItem, CloudItemType } from '../src/types/CloudItemTypes';
import { ConnectButton } from '../src/components/ConnectButton';
import { Container, ContainerProps } from '../src/components/Container';
import { DataGrid } from '../src/components/DataGrid';
import { EnabledFileIcon, FolderIcon } from '../src/icons/Icons';
import { executeRequestorPromises, MockRequestor } from './mocks/MockRequestor';
import { FileTypeMap } from '../src/types/ShimTypes';
import { FilterableDataGrid } from '../src/components/FilterableDataGrid';
import { MockProvider } from './mocks/MockProvider';
import { mount } from 'enzyme';
import { ProviderInfo } from '../src/providers/ProviderInfo';
import { ReactWrapper } from 'enzyme';
import { Requestor } from '../src/requestors/Requestor';
import { SearchBar } from '../src/components/SearchBar';
import { SearchFieldWidget } from 'shared-widgets';

describe('Container', () => {
  const pathEntries: BasicCloudItem = { id: '0', name: 'All Files', type: CloudItemType.Folder };
  const testCloudFiles: CloudItem[] = [
    {
      id: '1',
      name: 'A',
      type: CloudItemType.Folder,
      modifiedAt: new Date(),
      canBeSelected: true,
      displayAsEnabled: true,
      displayKind: 'folder',
      extension: '',
      icon: FolderIcon,
      path: [pathEntries]
    },
    {
      id: '2',
      name: 'B',
      type: CloudItemType.File,
      modifiedAt: new Date(),
      canBeSelected: true,
      displayAsEnabled: true,
      displayKind: '.xlsx',
      extension: 'xlsx',
      icon: EnabledFileIcon,
      path: [pathEntries]
    },
    {
      id: '3',
      name: 'C',
      type: CloudItemType.File,
      modifiedAt: new Date(),
      canBeSelected: true,
      displayAsEnabled: true,
      displayKind: '.txt',
      extension: 'txt',
      icon: EnabledFileIcon,
      path: [pathEntries]
    },
  ];
  const testProviderInfo: ProviderInfo = new MockProvider();
  const testRequestor: Requestor = new MockRequestor({accessToken: '', userId: ''}, testProviderInfo);
  const testSupportedFileTypes: FileTypeMap = {'test': ['xlsx', 'txt'] };
  const mockContainerProps = {
    providerInfo: testProviderInfo,
    requestor: testRequestor,
    supportedFileTypes: testSupportedFileTypes
  };

  let requestorPromise: Promise<CloudItem[]>;
  let connectSpy: jasmine.Spy;

  beforeEach(() => {
    Promise = MockPromises.getMockPromise(Promise);
    requestorPromise = MockPromises.getMockPromise(Promise).resolve(testCloudFiles);
    spyOn(testRequestor, 'enumerateItems').and.returnValue(requestorPromise);
    connectSpy = spyOn(Container.prototype, 'connect');
  });

  afterEach(() => {
    Promise = MockPromises.getOriginalPromise();
  });

  describe('connect button', () => {
    it('should be disabled initially', () => {
      const wrapper: ReactWrapper<ContainerProps, {}> = mount(<Container { ...mockContainerProps } />);
      const connectButton = wrapper.find(ConnectButton);
      executeRequestorPromises(requestorPromise);

      expect(connectButton.props().enabled).toBe(false);
    });

    it('should be disabled when a folder is selected', () => {
      const wrapper: ReactWrapper<ContainerProps, {}> = mount(<Container { ...mockContainerProps } />);
      const connectButton = wrapper.find(ConnectButton);
      executeRequestorPromises(requestorPromise);

      // Select a file first to be sure that selecting a folder actually disables the connect button
      wrapper.find(FilterableDataGrid).find(DataGrid).find(Body).find(BodyRow).at(1).simulate('click');
      wrapper.find(FilterableDataGrid).find(DataGrid).find(Body).find(BodyRow).at(0).simulate('click');
      expect(connectButton.props().enabled).toBe(false);
    });

    it('should be disabled after opening a folder', () => {
      const wrapper: ReactWrapper<ContainerProps, {}> = mount(<Container { ...mockContainerProps } />);
      const connectButton = wrapper.find(ConnectButton);
      executeRequestorPromises(requestorPromise);

      // Select a file first to be sure that opening a folder actually disables the connect button
      wrapper.find(FilterableDataGrid).find(DataGrid).find(Body).find(BodyRow).at(1).simulate('click');
      wrapper.find(FilterableDataGrid).find(DataGrid).find(Body).find(BodyRow).at(0).simulate('doubleclick');
      expect(connectButton.props().enabled).toBe(false);
    });

    it('should be disabled after clicking a breadcrumb item', () => {
      const wrapper: ReactWrapper<ContainerProps, {}> = mount(<Container { ...mockContainerProps } />);
      const connectButton = wrapper.find(ConnectButton);
      executeRequestorPromises(requestorPromise);

      // Select a file first to be sure that selecting a breadcrumb actually disables the connect button
      wrapper.find(FilterableDataGrid).find(DataGrid).find(Body).find(BodyRow).at(1).simulate('click');
      const breadcrumbText = wrapper.find(Breadcrumb).find(BreadcrumbItem).first().find('span').first().childAt(0);
      breadcrumbText.simulate('click');
      expect(connectButton.props().enabled).toBe(false);
    });

    it('should be enabled when a file is selected', () => {
      const wrapper: ReactWrapper<ContainerProps, {}> = mount(<Container { ...mockContainerProps } />);
      const connectButton = wrapper.find(ConnectButton);
      executeRequestorPromises(requestorPromise);

      wrapper.find(FilterableDataGrid).find(DataGrid).find(Body).find(BodyRow).at(1).simulate('click');
      expect(connectButton.props().enabled).toBe(true);
    });

    it('should be disabled after searching', () => {
      const wrapper: ReactWrapper<ContainerProps, {}> = mount(<Container { ...mockContainerProps } />);
      const connectButton = wrapper.find(ConnectButton);
      const searchInput = wrapper.find(FilterableDataGrid).find(SearchBar).find(SearchFieldWidget).find('input');
      spyOn(testRequestor, 'search').and.returnValue(requestorPromise);
      executeRequestorPromises(requestorPromise);

      // Select a file first to be sure that opening a folder actually disables the connect button
      wrapper.find(FilterableDataGrid).find(DataGrid).find(Body).find(BodyRow).at(1).simulate('click');
      searchInput.simulate('change', { target: { value: 'test' } });
      searchInput.simulate('keyDown', { key: 'Enter', keyCode: 13, which: 13});
      expect(connectButton.props().enabled).toBe(false);
    });

    it('should be disabled after cancelling search results', () => {
      const wrapper: ReactWrapper<ContainerProps, {}> = mount(<Container { ...mockContainerProps } />);
      const connectButton = wrapper.find(ConnectButton);
      const searchInput = wrapper.find(FilterableDataGrid).find(SearchBar).find(SearchFieldWidget).find('input');
      spyOn(testRequestor, 'search').and.returnValue(requestorPromise);
      executeRequestorPromises(requestorPromise);

      searchInput.simulate('change', { target: { value: 'test' } });
      searchInput.simulate('keyDown', { key: 'Enter', keyCode: 13, which: 13});
      executeRequestorPromises(requestorPromise);

      // Select a file first to be sure that cancelling a search actually disables the connect button
      wrapper.find(FilterableDataGrid).find(DataGrid).find(Body).find(BodyRow).at(1).simulate('click');
      wrapper.find(FilterableDataGrid).find(SearchBar).props().handleCancel();
      expect(connectButton.props().enabled).toBe(false);
    });
  });

  it('should connect when a file is double-clicked on', () => {
      const container: ReactWrapper<ContainerProps, {}> = mount(<Container { ...mockContainerProps } />);
      executeRequestorPromises(requestorPromise);

      container.find(FilterableDataGrid).find(BodyRow).at(1).simulate('doubleclick');
      expect(connectSpy).toHaveBeenCalled();
  });

  it('should connect when a file is selected and the enter key is pressed down', () => {
      const container: ReactWrapper<ContainerProps, {}> = mount(<Container { ...mockContainerProps } />);
      executeRequestorPromises(requestorPromise);

      container.find(FilterableDataGrid).find(BodyRow).at(1).simulate('click');
      container.find(FilterableDataGrid).find(BodyRow).at(1).simulate('keyDown', {key: 'Enter', keyCode: 13, which: 13});
      expect(connectSpy).toHaveBeenCalled();
  });

});
