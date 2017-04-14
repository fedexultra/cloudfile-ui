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

import { ArrowDownIcon, ArrowUpIcon } from '../src/icons/Icons';
import { Body } from '../src/components/Body';
import { BodyCell } from '../src/components/BodyCell';
import { BodyRow } from '../src/components/BodyRow';
import { Breadcrumb } from '../src/components/Breadcrumb';
import { BreadcrumbItem } from '../src/components/BreadcrumbItem';
import { BasicCloudItem, CloudItem, CloudItemType } from '../src/types/CloudItemTypes';
import { DataGrid } from '../src/components/DataGrid';
import { ErrorWidget } from '../src/components/ErrorWidget';
import { EnabledFileIcon, FolderIcon } from '../src/icons/Icons';
import { FilterableDataGridProps, FilterableDataGrid } from '../src/components/FilterableDataGrid';
import { HeaderCell } from '../src/components/HeaderCell';
import { Messages } from '../src/codegen/Localize';
import { MockProvider } from './mocks/MockProvider';
import { MockRequestor } from './mocks/MockRequestor';
import { mount, shallow } from 'enzyme';
import { ProviderInfo } from '../src/providers/ProviderInfo';
import { ReactWrapper, ShallowWrapper } from 'enzyme';
import { Requestor } from '../src/requestors/Requestor';
import { SearchBar } from '../src/components/SearchBar';
import { SearchFieldWidget } from 'shared-widgets';
import { SortOrder } from '../src/types/SortOrderTypes';
import { Spinner } from '../src/components/Spinner';

describe('Filterable Data Grid', () => {
  const testProviderInfo: ProviderInfo = new MockProvider();
  const testRequestor: Requestor = new MockRequestor({accessToken: '', userId: ''}, testProviderInfo);
  const pathContent: BasicCloudItem = { id: '4', name: 'D', type: CloudItemType.Folder };
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
      path: [pathContent]
    },
    {
      id: '2',
      name: 'B',
      type: CloudItemType.File,
      modifiedAt: new Date(),
      canBeSelected: true,
      displayAsEnabled: true,
      displayKind: '',
      extension: '',
      icon: EnabledFileIcon,
      path: []
    },
    {
      id: '3',
      name: 'C',
      type: CloudItemType.File,
      modifiedAt: new Date(),
      canBeSelected: true,
      displayAsEnabled: true,
      displayKind: '',
      extension: '',
      icon: EnabledFileIcon,
      path: []
    },
  ];
  const emptySearchResults: CloudItem[] = [];

  const mockFilterableDataGridProps = {
    providerInfo: testProviderInfo,
    requestor: testRequestor,
    onItemSelected: (item: CloudItem) => { return; },
    onFolderOpened: (itemId: string) => { return; },
    onConnect: () => { return; }
  };

  const simulateTextInput = (wrapper: ReactWrapper<FilterableDataGridProps, {}>, inputText: string) => {
    wrapper
      .find(SearchBar)
      .find(SearchFieldWidget)
      .find('input')
      .simulate('change', { target: { value: inputText } });
    wrapper
      .find(SearchBar)
      .find(SearchFieldWidget)
      .find('input')
      .simulate('keyDown', {key: 'Enter', keyCode: 13, which: 13});
  };

  describe('rendering', () => {

    let requestorPromise: Promise<CloudItem[]>;
    let enumerateItemsSpy: jasmine.Spy;

    beforeEach(() => {
      MockPromises.install(Promise);
      requestorPromise = MockPromises.getMockPromise(Promise).resolve(testCloudFiles);
      enumerateItemsSpy = spyOn(testRequestor, 'enumerateItems').and.returnValue(requestorPromise);
    });

    afterEach(() => {
      MockPromises.uninstall();
    });

    it('should render a spinner initially', () => {
      const wrapper: ShallowWrapper<FilterableDataGridProps, {}> = shallow(
        <FilterableDataGrid {...mockFilterableDataGridProps}/>);
      expect(wrapper.find(Spinner).length).toBe(1);
    });

    it('should render a search bar', () => {
      const wrapper: ShallowWrapper<FilterableDataGridProps, {}> = shallow(
        <FilterableDataGrid { ...mockFilterableDataGridProps } />);
      expect(wrapper.find(SearchBar).length).toBe(1);
    });

    it('should render a breadcrumb trail', () => {
      const wrapper: ShallowWrapper<FilterableDataGridProps, {}> = shallow(
        <FilterableDataGrid { ...mockFilterableDataGridProps } />);
      expect(wrapper.find(Breadcrumb).length).toBe(1);
    });

    it('should render a body', () => {
      const wrapper: ReactWrapper<FilterableDataGridProps, {}> = mount(
        <FilterableDataGrid {...mockFilterableDataGridProps}/>);
      MockPromises.executeForPromise(requestorPromise);

      const spinner = wrapper.find(Spinner);
      expect(spinner.length).toBe(0);
      expect(enumerateItemsSpy).toHaveBeenCalled();
      expect(wrapper.find(DataGrid).length).toBe(1);
    });

  });

  describe('standard search behavior', () => {

    let requestorPromise: Promise<CloudItem[]>;
    let enumerateItemsSpy: jasmine.Spy;
    let searchSpy: jasmine.Spy;

    beforeEach(() => {
      MockPromises.install(Promise);
      requestorPromise = MockPromises.getMockPromise(Promise).resolve(testCloudFiles);
      enumerateItemsSpy = spyOn(testRequestor, 'enumerateItems').and.returnValue(requestorPromise);
      searchSpy = spyOn(testRequestor, 'search').and.returnValue(requestorPromise);
    });

    afterEach(() => {
      MockPromises.uninstall();
    });

    it('should render a spinner before displaying search results', () => {
      const wrapper: ReactWrapper<FilterableDataGridProps, {}> = mount(
        <FilterableDataGrid {...mockFilterableDataGridProps}/>);
      const mockTextInput = 'text text input';
      simulateTextInput(wrapper, mockTextInput);

      expect(wrapper.find(Spinner).length).toBe(1);
    });

    it('should update props when text input changes', () => {
      const wrapper: ReactWrapper<FilterableDataGridProps, {}> = mount(
        <FilterableDataGrid {...mockFilterableDataGridProps}/>);
      const searchBar = wrapper.find(SearchBar);

      const mockTextInput = 'text text input';
      simulateTextInput(wrapper, mockTextInput);
      MockPromises.executeForPromise(requestorPromise);
      expect(searchBar.props().displayText).toBe(mockTextInput);
    });

    it('should call requestor function', () => {
      const wrapper: ReactWrapper<FilterableDataGridProps, {}> = mount(
        <FilterableDataGrid {...mockFilterableDataGridProps}/>);

      const mockTextInput = 'text text input';
      simulateTextInput(wrapper, mockTextInput);
      expect(searchSpy).toHaveBeenCalled();
    });

    it('should clear the text after cancelling search', () => {
      const wrapper: ReactWrapper<FilterableDataGridProps, {}> = mount(
        <FilterableDataGrid {...mockFilterableDataGridProps}/>);
      const searchBar = wrapper.find(SearchBar);
      MockPromises.executeForPromise(requestorPromise);

      const mockTextInput = 'text text input';
      simulateTextInput(wrapper, mockTextInput);
      MockPromises.executeForPromise(requestorPromise);
      searchBar.props().handleCancel();
      MockPromises.executeForPromise(requestorPromise);
      expect(searchBar.props().displayText).toBe('');
    });

  });

  describe('empty search behavior', () => {

    let requestorPromise: Promise<CloudItem[]>;
    let enumerateItemsSpy: jasmine.Spy;
    let searchSpy: jasmine.Spy;
    let emptyRequestorPromise: Promise<CloudItem[]>;

    beforeEach(() => {
      MockPromises.install(Promise);
      requestorPromise = MockPromises.getMockPromise(Promise).resolve(testCloudFiles);
      enumerateItemsSpy = spyOn(testRequestor, 'enumerateItems').and.returnValue(requestorPromise);
      emptyRequestorPromise = MockPromises.getMockPromise(Promise).resolve(emptySearchResults);
      searchSpy = spyOn(testRequestor, 'search').and.returnValue(emptyRequestorPromise);
    });

    afterEach(() => {
      MockPromises.uninstall();
    });

    it('should display error widget when no text search results are returned', () => {
      const filterableDataGrid: ReactWrapper<FilterableDataGridProps, {}> = mount(
        <FilterableDataGrid {...mockFilterableDataGridProps}/>);

      const mockTextInput = 'text text input';
      simulateTextInput(filterableDataGrid, mockTextInput);
      expect(searchSpy).toHaveBeenCalled();
      MockPromises.executeForPromise(emptyRequestorPromise);

      const expectedErrorText = Messages.queryErrorMessage();
      const result = filterableDataGrid.find(ErrorWidget).props().errorMessage;
      expect(result).toBe(expectedErrorText);
    });

    it('should display error widget when no http results are returned', () => {
      const filterableDataGrid: ReactWrapper<FilterableDataGridProps, {}> = mount(
        <FilterableDataGrid {...mockFilterableDataGridProps}/>);
      MockPromises.executeForPromise(requestorPromise);

      const mockTextInput = 'http://dummy.com';
      simulateTextInput(filterableDataGrid, mockTextInput);
      MockPromises.executeForPromise(emptyRequestorPromise);

      const expectedErrorText = Messages.urlErrorMessage();
      const result = filterableDataGrid.find(ErrorWidget).props().errorMessage;
      expect(result).toBe(expectedErrorText);
    });

  });

  describe('breadcrumb', () => {

    let requestorPromise: Promise<CloudItem[]>;
    let enumerateItemsSpy: jasmine.Spy;

    beforeEach(() => {
      MockPromises.install(Promise);
      requestorPromise = MockPromises.getMockPromise(Promise).resolve(testCloudFiles);
      enumerateItemsSpy = spyOn(testRequestor, 'enumerateItems').and.returnValue(requestorPromise);
    });

    afterEach(() => {
      MockPromises.uninstall();
    });

    it('should render a spinner before displaying folder content', () => {
      const filterableDataGrid: ReactWrapper<FilterableDataGridProps, {}> = mount(
        <FilterableDataGrid {...mockFilterableDataGridProps}/>);
      MockPromises.executeForPromise(requestorPromise);

      const breadcrumbText = filterableDataGrid.find(BreadcrumbItem).first().find('span').first().childAt(0);
      breadcrumbText.simulate('click');

      expect(filterableDataGrid.find(Spinner).length).toBe(1);
    });

  });

  describe('folder navigation', () => {

    let requestorPromise: Promise<CloudItem[]>;
    let enumerateItemsSpy: jasmine.Spy;
    let searchSpy: jasmine.Spy;

    beforeEach(() => {
      MockPromises.install(Promise);
      requestorPromise = MockPromises.getMockPromise(Promise).resolve(testCloudFiles);
      enumerateItemsSpy = spyOn(testRequestor, 'enumerateItems').and.returnValue(requestorPromise);
      searchSpy = spyOn(testRequestor, 'search').and.returnValue(requestorPromise);
    });

    afterEach(() => {
      MockPromises.uninstall();
    });

    it('should render a spinner after clicking on a folder text', () => {
      const filterableDataGrid: ReactWrapper<FilterableDataGridProps, {}> = mount(
        <FilterableDataGrid {...mockFilterableDataGridProps}/>);
      MockPromises.executeForPromise(requestorPromise);

      const bodyRow = filterableDataGrid.find(BodyRow).first();
      const bodyCell = bodyRow.find(BodyCell).first();
      const folderText = bodyCell.find('.data-grid-body-cell-value');
      folderText.simulate('click');

      expect(filterableDataGrid.find(Spinner).length).toBe(1);
    });

    it('should render a spinner after double-clicking on a folder', () => {
      const filterableDataGrid: ReactWrapper<FilterableDataGridProps, {}> = mount(
        <FilterableDataGrid {...mockFilterableDataGridProps}/>);
      MockPromises.executeForPromise(requestorPromise);

      const bodyRow = filterableDataGrid.find(DataGrid).find(Body).find(BodyRow).first();
      bodyRow.simulate('doubleclick');

      expect(filterableDataGrid.find(Spinner).length).toBe(1);
    });

    it('should render a spinner after pressing the enter key on a folder', () => {
      const filterableDataGrid: ReactWrapper<FilterableDataGridProps, {}> = mount(
        <FilterableDataGrid {...mockFilterableDataGridProps}/>);
      MockPromises.executeForPromise(requestorPromise);

      const bodyRow = filterableDataGrid.find(BodyRow).first();
      bodyRow.simulate('click');
      bodyRow.simulate('keyDown', {key: 'Enter', keyCode: 13, which: 13});

      expect(filterableDataGrid.find(Spinner).length).toBe(1);
    });

    it('by double-clicking a folder row should update data grid and clear search text', () => {
      const filterableDataGrid: ReactWrapper<FilterableDataGridProps, {}> = mount(
        <FilterableDataGrid {...mockFilterableDataGridProps}/>);
      MockPromises.executeForPromise(requestorPromise);

      const searchBar = filterableDataGrid.find(SearchBar);
      const mockTextInput = 'text text input';
      simulateTextInput(filterableDataGrid, mockTextInput);
      MockPromises.executeForPromise(requestorPromise);
      expect(searchBar.props().displayText).toBe(mockTextInput);

      const bodyRow = filterableDataGrid.find(DataGrid).find(Body).find(BodyRow).first();
      bodyRow.simulate('doubleclick');
      MockPromises.executeForPromise(requestorPromise);
      expect(enumerateItemsSpy).toHaveBeenCalledTimes(2);
      expect(searchBar.props().displayText).toBe('');
    });

    it('by clicking folder text should update data grid and clear search text', () => {
      const filterableDataGrid: ReactWrapper<FilterableDataGridProps, {}> = mount(
        <FilterableDataGrid {...mockFilterableDataGridProps}/>);
      MockPromises.executeForPromise(requestorPromise);

      const searchBar = filterableDataGrid.find(SearchBar);
      const mockTextInput = 'text text input';
      simulateTextInput(filterableDataGrid, mockTextInput);
      MockPromises.executeForPromise(requestorPromise);
      expect(searchBar.props().displayText).toBe(mockTextInput);

      const bodyRow = filterableDataGrid.find(DataGrid).find(Body).find(BodyRow).first();
      const bodyCell = bodyRow.find(BodyCell).first();
      const folderText = bodyCell.find('.data-grid-body-cell-value');
      folderText.simulate('click');
      MockPromises.executeForPromise(requestorPromise);
      expect(enumerateItemsSpy).toHaveBeenCalledTimes(2);
      expect(searchBar.props().displayText).toBe('');
    });

    it('by pressing the enter key on a folder should update data grid and clear search text', () => {
      const filterableDataGrid: ReactWrapper<FilterableDataGridProps, {}> = mount(
        <FilterableDataGrid {...mockFilterableDataGridProps}/>);
      MockPromises.executeForPromise(requestorPromise);

      const searchBar = filterableDataGrid.find(SearchBar);
      const mockTextInput = 'text text input';
      simulateTextInput(filterableDataGrid, mockTextInput);
      MockPromises.executeForPromise(requestorPromise);
      expect(searchBar.props().displayText).toBe(mockTextInput);

      const bodyRow = filterableDataGrid.find(BodyRow).first();
      bodyRow.simulate('click');
      bodyRow.simulate('keyDown', {key: 'Enter', keyCode: 13, which: 13});
      MockPromises.executeForPromise(requestorPromise);
      expect(enumerateItemsSpy).toHaveBeenCalledTimes(2);
      expect(searchBar.props().displayText).toBe('');
    });

  });

  describe('sortable column and order', () => {

    let requestorPromise: Promise<CloudItem[]>;
    let enumerateItemsSpy: jasmine.Spy;
    let searchSpy: jasmine.Spy;
    let emptyRequestorPromise: Promise<CloudItem[]>;

    beforeEach(() => {
      MockPromises.install(Promise);
      requestorPromise = MockPromises.getMockPromise(Promise).resolve(testCloudFiles);
      enumerateItemsSpy = spyOn(testRequestor, 'enumerateItems').and.returnValue(requestorPromise);
      emptyRequestorPromise = MockPromises.getMockPromise(Promise).resolve(emptySearchResults);
      searchSpy = spyOn(testRequestor, 'search').and.returnValue(emptyRequestorPromise);
    });

    afterEach(() => {
      MockPromises.uninstall();
    });

    it('should be "Name" column in ascending order initially', () => {
      const filterableDataGrid: ReactWrapper<FilterableDataGridProps, {}> = mount(
        <FilterableDataGrid { ...mockFilterableDataGridProps } />);
      const dataGrid = filterableDataGrid.find(DataGrid);
      expect(dataGrid.props().sortableColumnId).toBe(0);
      expect(dataGrid.props().sortOrder).toBe(SortOrder.ascending);
      const nameColumn = filterableDataGrid.find(HeaderCell).at(0);
      expect(nameColumn.props().icon).toBe(ArrowUpIcon);
    });

    it('should be in ascending order on first click', () => {
      const filterableDataGrid: ReactWrapper<FilterableDataGridProps, {}> = mount(
        <FilterableDataGrid { ...mockFilterableDataGridProps } />);
      const modifiedAtColumn = filterableDataGrid.find(HeaderCell).at(1);
      modifiedAtColumn.simulate('click');

      const dataGrid = filterableDataGrid.find(DataGrid);
      expect(dataGrid.props().sortableColumnId).toBe(1);
      expect(dataGrid.props().sortOrder).toBe(SortOrder.ascending);
    });

    it('should change order on subsequent click', () => {
      const filterableDataGrid: ReactWrapper<FilterableDataGridProps, {}> = mount(
        <FilterableDataGrid {...mockFilterableDataGridProps}/>);
      const secondColumn = filterableDataGrid.find(HeaderCell).at(1);

      secondColumn.simulate('click');
      secondColumn.simulate('click');

      const dataGrid = filterableDataGrid.find(DataGrid);
      expect(dataGrid.props().sortableColumnId).toBe(1);
      expect(dataGrid.props().sortOrder).toBe(SortOrder.descending);
      expect(secondColumn.props().icon).toBe(ArrowDownIcon);
    });

    it('should remain the same after searching', () => {
      const filterableDataGrid: ReactWrapper<FilterableDataGridProps, {}> = mount(
        <FilterableDataGrid {...mockFilterableDataGridProps}/>);
      const secondColumn = filterableDataGrid.find(HeaderCell).at(1);
      secondColumn.simulate('click');

      simulateTextInput(filterableDataGrid, 'text text input');

      const dataGrid = filterableDataGrid.find(DataGrid);
      expect(dataGrid.props().sortableColumnId).toBe(1);
      expect(dataGrid.props().sortOrder).toBe(SortOrder.ascending);
    });

    it('should remain the same after searching and clearing search', () => {
      const filterableDataGrid: ReactWrapper<FilterableDataGridProps, {}> = mount(
        <FilterableDataGrid {...mockFilterableDataGridProps}/>);
      const secondColumn = filterableDataGrid.find(HeaderCell).at(1);
      secondColumn.simulate('click');

      simulateTextInput(filterableDataGrid, 'text text input');
      simulateTextInput(filterableDataGrid, '');

      const dataGrid = filterableDataGrid.find(DataGrid);
      expect(dataGrid.props().sortableColumnId).toBe(1);
      expect(dataGrid.props().sortOrder).toBe(SortOrder.ascending);
    });

    it('should remain the same after breadcrumb navigation', () => {
      const filterableDataGrid: ReactWrapper<FilterableDataGridProps, {}> = mount(
        <FilterableDataGrid {...mockFilterableDataGridProps}/>);
      MockPromises.executeForPromise(requestorPromise);

      const secondColumn = filterableDataGrid.find(HeaderCell).at(1);
      secondColumn.simulate('click');

      const bodyRow = filterableDataGrid.find(DataGrid).find(BodyRow).first();
      bodyRow.simulate('click');
      MockPromises.executeForPromise(requestorPromise);

      const breadcrumbText = filterableDataGrid.find(BreadcrumbItem).first().find('span').first().childAt(0);
      breadcrumbText.simulate('click');

      const dataGrid = filterableDataGrid.find(DataGrid);
      expect(dataGrid.props().sortableColumnId).toBe(1);
      expect(dataGrid.props().sortOrder).toBe(SortOrder.ascending);
    });

    it('should remain the same after folder navigation by double-clicking a row', () => {
      const filterableDataGrid: ReactWrapper<FilterableDataGridProps, {}> = mount(
        <FilterableDataGrid {...mockFilterableDataGridProps}/>);
      MockPromises.executeForPromise(requestorPromise);

      const secondColumn = filterableDataGrid.find(HeaderCell).at(1);
      secondColumn.simulate('click');

      const bodyRow = filterableDataGrid.find(DataGrid).find(BodyRow).first();
      bodyRow.simulate('doubleclick');
      MockPromises.executeForPromise(requestorPromise);

      const dataGrid = filterableDataGrid.find(DataGrid);
      expect(dataGrid.props().sortableColumnId).toBe(1);
      expect(dataGrid.props().sortOrder).toBe(SortOrder.ascending);
    });

    it('should remain the same after folder navigation by clicking folder text', () => {
      const filterableDataGrid: ReactWrapper<FilterableDataGridProps, {}> = mount(
        <FilterableDataGrid {...mockFilterableDataGridProps}/>);
      MockPromises.executeForPromise(requestorPromise);

      const secondColumn = filterableDataGrid.find(HeaderCell).at(1);
      secondColumn.simulate('click');

      const bodyRow = filterableDataGrid.find(DataGrid).find(Body).find(BodyRow).first();
      const bodyCell = bodyRow.find(BodyCell).first();
      const folderText = bodyCell.find('.data-grid-body-cell-value');
      folderText.simulate('click');
      MockPromises.executeForPromise(requestorPromise);

      const dataGrid = filterableDataGrid.find(DataGrid);
      expect(dataGrid.props().sortableColumnId).toBe(1);
      expect(dataGrid.props().sortOrder).toBe(SortOrder.ascending);
    });

  });

});
