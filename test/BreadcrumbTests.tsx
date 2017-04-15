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
import { BodyCell } from '../src/components/BodyCell';
import { BodyRow } from '../src/components/BodyRow';
import { Breadcrumb } from '../src/components/Breadcrumb';
import { BasicCloudItem, CloudItem, CloudItemType } from '../src/types/CloudItemTypes';
import { DataGrid } from '../src/components/DataGrid';
import { EnabledFileIcon, FolderIcon } from '../src/icons/Icons';
import { executeRequestorPromises, MockRequestor } from './mocks/MockRequestor';
import { FilterableDataGridProps, FilterableDataGrid } from '../src/components/FilterableDataGrid';
import { Messages } from '../src/codegen/Localize';
import { MockProvider } from './mocks/MockProvider';
import { mount, ReactWrapper } from 'enzyme';
import { ProviderInfo } from '../src/providers/ProviderInfo';
import { Requestor } from '../src/requestors/Requestor';
import { SearchBar } from '../src/components/SearchBar';
import { SearchFieldWidget } from 'shared-widgets';

describe('Breadcrumb', () => {
  const providerInfo: ProviderInfo = new MockProvider();
  const requestor: Requestor = new MockRequestor({accessToken: '', userId: ''}, providerInfo);
  const pathEntries: BasicCloudItem = { id: '4', name: 'D', type: CloudItemType.Folder };
  const cloudItems: CloudItem[] = [
    {
      id: '1',
      name: 'A',
      type: CloudItemType.Folder,
      modifiedAt: new Date(),
      canBeSelected: true,
      displayAsEnabled: true,
      displayKind: '',
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
      displayKind: '',
      extension: '',
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
      displayKind: '',
      extension: '',
      icon: EnabledFileIcon,
      path: []
    },
  ];

  const mockFilterableDataGridProps = {
    providerInfo: providerInfo,
    requestor: requestor,
    onItemSelected: (item: CloudItem) => { return; },
    onFolderOpened: (itemId: string) => { return; },
    onConnect: () => { return; }
  };

  let enumerateItemsPromise: Promise<CloudItem[]>;
  let searchPromise: Promise<CloudItem[]>;

  beforeEach(() => {
    Promise = MockPromises.getMockPromise(Promise);
    enumerateItemsPromise = MockPromises.getMockPromise(Promise).resolve(cloudItems);
    spyOn(requestor, 'enumerateItems').and.returnValue(enumerateItemsPromise);
  });

  afterEach(() => {
    Promise = MockPromises.getOriginalPromise();
  });

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

  it('should render root directory on intial display', () => {
    const filterableDataGrid: ReactWrapper<FilterableDataGridProps, {}> = mount(
      <FilterableDataGrid {...mockFilterableDataGridProps}/>);
    executeRequestorPromises(enumerateItemsPromise);

    const breadcrumb = filterableDataGrid.find(Breadcrumb);
    expect(breadcrumb.props().trail.length).toBe(1);
    expect(breadcrumb.props().trail[0].name).toBe(providerInfo.getProviderName());
  });

  it('should update after selecting a folder', () => {
    const filterableDataGrid: ReactWrapper<FilterableDataGridProps, {}> = mount(
      <FilterableDataGrid {...mockFilterableDataGridProps}/>);
    executeRequestorPromises(enumerateItemsPromise);

    const bodyRow = filterableDataGrid.find(DataGrid).find(Body).find(BodyRow).first();
    bodyRow.simulate('click');
    executeRequestorPromises(enumerateItemsPromise);

    // Breadcrumb should be 'D' -> 'A'
    const breadcrumb = filterableDataGrid.find(Breadcrumb);
    expect(breadcrumb.props().trail.length).toBe(2);
    expect(breadcrumb.props().trail[0]).toBe(pathEntries);
    expect(breadcrumb.props().trail[1].id).toBe(cloudItems[0].id);
    expect(breadcrumb.props().trail[1].name).toBe(cloudItems[0].name);
    expect(breadcrumb.props().trail[1].type).toBe(cloudItems[0].type);
  });

  it('should update after double-clicking a folder row', () => {
    const filterableDataGrid: ReactWrapper<FilterableDataGridProps, {}> = mount(
      <FilterableDataGrid {...mockFilterableDataGridProps}/>);
    executeRequestorPromises(enumerateItemsPromise);

    const bodyRow = filterableDataGrid.find(DataGrid).find(Body).find(BodyRow).first();
    bodyRow.simulate('doubleclick');
    executeRequestorPromises(enumerateItemsPromise);

    // Breadcrumb should be 'D' -> 'A'
    const breadcrumb = filterableDataGrid.find(Breadcrumb);
    expect(breadcrumb.props().trail.length).toBe(2);
    expect(breadcrumb.props().trail[0]).toBe(pathEntries);
    expect(breadcrumb.props().trail[1].id).toBe(cloudItems[0].id);
    expect(breadcrumb.props().trail[1].name).toBe(cloudItems[0].name);
    expect(breadcrumb.props().trail[1].type).toBe(cloudItems[0].type);
  });

  it('should update after clicking on folder text', () => {
    const filterableDataGrid: ReactWrapper<FilterableDataGridProps, {}> = mount(
      <FilterableDataGrid {...mockFilterableDataGridProps}/>);
    executeRequestorPromises(enumerateItemsPromise);

    const bodyRow = filterableDataGrid.find(DataGrid).find(Body).find(BodyRow).first();
    const bodyCell = bodyRow.find(BodyCell).first();
    const folderText = bodyCell.find('.data-grid-body-cell-value');
    folderText.simulate('click');
    executeRequestorPromises(enumerateItemsPromise);

    // Breadcrumb should be 'D' -> 'A'
    const breadcrumb = filterableDataGrid.find(Breadcrumb);
    expect(breadcrumb.props().trail.length).toBe(2);
    expect(breadcrumb.props().trail[0]).toBe(pathEntries);
    expect(breadcrumb.props().trail[1].id).toBe(cloudItems[0].id);
    expect(breadcrumb.props().trail[1].name).toBe(cloudItems[0].name);
    expect(breadcrumb.props().trail[1].type).toBe(cloudItems[0].type);
  });

  it('should update after selecting a file', () => {
    const filterableDataGrid: ReactWrapper<FilterableDataGridProps, {}> = mount(
      <FilterableDataGrid {...mockFilterableDataGridProps}/>);
    executeRequestorPromises(enumerateItemsPromise);

    const bodyRow = filterableDataGrid.find(DataGrid).find(Body).find(BodyRow).at(1);
    bodyRow.simulate('click');

    // Breadcrumb should be 'D' -> 'B'
    const breadcrumb = filterableDataGrid.find(Breadcrumb);
    expect(breadcrumb.props().trail.length).toBe(2);
    expect(breadcrumb.props().trail[0]).toBe(pathEntries);
    expect(breadcrumb.props().trail[1].id).toBe(cloudItems[1].id);
    expect(breadcrumb.props().trail[1].name).toBe(cloudItems[1].name);
    expect(breadcrumb.props().trail[1].type).toBe(cloudItems[1].type);
  });

  it('should render "Search Results" message after entering a query', () => {
    const searchResults: CloudItem[] = [
      {
        id: '3',
        name: 'test text input',
        type: CloudItemType.Folder,
        modifiedAt: new Date(),
        canBeSelected: true,
        displayAsEnabled: true,
        displayKind: '',
        extension: '',
        icon: EnabledFileIcon,
        path: [pathEntries]
      },
    ];
    searchPromise = MockPromises.getMockPromise(Promise).resolve(searchResults);
    spyOn(requestor, 'search').and.returnValue(searchPromise);

    const filterableDataGrid: ReactWrapper<FilterableDataGridProps, {}> = mount(
      <FilterableDataGrid {...mockFilterableDataGridProps}/>);
    executeRequestorPromises(enumerateItemsPromise);

    const mockTextInput = 'test text input';
    simulateTextInput(filterableDataGrid, mockTextInput);
    executeRequestorPromises(searchPromise);

    const searchResultsMessage = filterableDataGrid.findWhere(wrapper => {
      return wrapper.props()['data-tb-test-id'] === 'filterable-data-grid-search-results-message';
    });
    expect(searchResultsMessage.text()).toBe(Messages.searchResultsMessage());
  });

  it('should still render "Search Results" message after entering a query and selecting a file', () => {
    const searchResults: CloudItem[] = [
      {
        id: '3',
        name: 'test text input',
        type: CloudItemType.File,
        modifiedAt: new Date(),
        canBeSelected: true,
        displayAsEnabled: true,
        displayKind: '',
        extension: '',
        icon: EnabledFileIcon,
        path: [pathEntries]
      },
    ];
    searchPromise = MockPromises.getMockPromise(Promise).resolve(searchResults);
    spyOn(requestor, 'search').and.returnValue(searchPromise);

    const filterableDataGrid: ReactWrapper<FilterableDataGridProps, {}> = mount(
      <FilterableDataGrid {...mockFilterableDataGridProps}/>);
    executeRequestorPromises(enumerateItemsPromise);

    const mockTextInput = 'test text input';
    simulateTextInput(filterableDataGrid, mockTextInput);
    executeRequestorPromises(searchPromise);

    const bodyRow = filterableDataGrid.find(DataGrid).find(Body).find(BodyRow).childAt(1);
    bodyRow.simulate('click');

    const searchResultsMessage = filterableDataGrid.findWhere(wrapper => {
      return wrapper.props()['data-tb-test-id'] === 'filterable-data-grid-search-results-message';
    });
    expect(searchResultsMessage.text()).toBe(Messages.searchResultsMessage());
  });

  it('should still render "Search Results" message after entering a query and selecting a folder', () => {
    const searchResults: CloudItem[] = [
      {
        id: '3',
        name: 'test text input',
        type: CloudItemType.Folder,
        modifiedAt: new Date(),
        canBeSelected: true,
        displayAsEnabled: true,
        displayKind: '',
        extension: '',
        icon: EnabledFileIcon,
        path: []
      },
    ];
    searchPromise = MockPromises.getMockPromise(Promise).resolve(searchResults);
    spyOn(requestor, 'search').and.returnValue(searchPromise);

    const filterableDataGrid: ReactWrapper<FilterableDataGridProps, {}> = mount(
      <FilterableDataGrid {...mockFilterableDataGridProps}/>);
    executeRequestorPromises(enumerateItemsPromise);

    const mockTextInput = 'test text input';
    simulateTextInput(filterableDataGrid, mockTextInput);
    executeRequestorPromises(searchPromise);

    const bodyRow = filterableDataGrid.find(DataGrid).find(Body).find(BodyRow).first();
    bodyRow.simulate('click');

    const searchResultsMessage = filterableDataGrid.findWhere(wrapper => {
      return wrapper.props()['data-tb-test-id'] === 'filterable-data-grid-search-results-message';
    });
    expect(searchResultsMessage.text()).toBe(Messages.searchResultsMessage());
  });

  it('should render previous breadcrumb trail after entering an empty query', () => {
    const searchResults: CloudItem[] = [
      {
        id: '3',
        name: 'test text input',
        type: CloudItemType.Folder,
        modifiedAt: new Date(),
        canBeSelected: true,
        displayAsEnabled: true,
        displayKind: '',
        extension: '',
        icon: EnabledFileIcon,
        path: [pathEntries]
      },
    ];
    searchPromise = MockPromises.getMockPromise(Promise).resolve(searchResults);
    spyOn(requestor, 'search').and.returnValue(searchPromise);

    const filterableDataGrid: ReactWrapper<FilterableDataGridProps, {}> = mount(
      <FilterableDataGrid {...mockFilterableDataGridProps}/>);
    executeRequestorPromises(enumerateItemsPromise);

    const mockTextInput = 'test text input';
    simulateTextInput(filterableDataGrid, mockTextInput);
    executeRequestorPromises(searchPromise);

    const emptyTextInput = '';
    simulateTextInput(filterableDataGrid, emptyTextInput);
    executeRequestorPromises(enumerateItemsPromise);

    // Breadcrumb should be 'Box'
    const breadcrumb = filterableDataGrid.find(Breadcrumb);
    expect(breadcrumb.props().trail.length).toBe(1);
    expect(breadcrumb.props().trail[0].name).toBe(providerInfo.getProviderName());
  });

  it('should render only folder items after entering an empty query, even if the previous breadcrumb\'s last item was a file', () => {
    const searchResults: CloudItem[] = [
      {
        id: '3',
        name: 'test text input',
        type: CloudItemType.Folder,
        modifiedAt: new Date(),
        canBeSelected: true,
        displayAsEnabled: true,
        displayKind: '',
        extension: '',
        icon: EnabledFileIcon,
        path: [pathEntries]
      },
    ];
    searchPromise = MockPromises.getMockPromise(Promise).resolve(searchResults);
    spyOn(requestor, 'search').and.returnValue(searchPromise);

    const filterableDataGrid: ReactWrapper<FilterableDataGridProps, {}> = mount(
      <FilterableDataGrid {...mockFilterableDataGridProps}/>);
    executeRequestorPromises(enumerateItemsPromise);

    const bodyRow = filterableDataGrid.find(DataGrid).find(Body).find(BodyRow).at(1);
    bodyRow.simulate('click');

    const mockTextInput = 'test text input';
    simulateTextInput(filterableDataGrid, mockTextInput);
    executeRequestorPromises(searchPromise);

    const emptyTextInput = '';
    simulateTextInput(filterableDataGrid, emptyTextInput);
    executeRequestorPromises(enumerateItemsPromise);

    // Breadcrumb should be 'D'
    const breadcrumb = filterableDataGrid.find(Breadcrumb);
    expect(breadcrumb.props().trail.length).toBe(1);
    expect(breadcrumb.props().trail[0]).toBe(pathEntries);
  });

  it('should update after entering a query and double-clicking a folder row from the search results', () => {
    const searchResults: CloudItem[] = [
      {
        id: '3',
        name: 'test text input',
        type: CloudItemType.Folder,
        modifiedAt: new Date(),
        canBeSelected: true,
        displayAsEnabled: true,
        displayKind: '',
        extension: '',
        icon: EnabledFileIcon,
        path: [pathEntries]
      },
    ];
    searchPromise = MockPromises.getMockPromise(Promise).resolve(searchResults);
    spyOn(requestor, 'search').and.returnValue(searchPromise);

    const filterableDataGrid: ReactWrapper<FilterableDataGridProps, {}> = mount(
      <FilterableDataGrid {...mockFilterableDataGridProps}/>);
    executeRequestorPromises(enumerateItemsPromise);

    const mockTextInput = 'test text input';
    simulateTextInput(filterableDataGrid, mockTextInput);
    executeRequestorPromises(searchPromise);

    const bodyRow = filterableDataGrid.find(DataGrid).find(Body).find(BodyRow).first();
    bodyRow.simulate('doubleclick');
    executeRequestorPromises(enumerateItemsPromise);

    // Breadcrumb should be 'D' -> 'test text input'
    const breadcrumb = filterableDataGrid.find(Breadcrumb);
    expect(breadcrumb.props().trail.length).toBe(2);
    expect(breadcrumb.props().trail[0]).toBe(pathEntries);
    expect(breadcrumb.props().trail[1].id).toBe(searchResults[0].id);
    expect(breadcrumb.props().trail[1].name).toBe(searchResults[0].name);
    expect(breadcrumb.props().trail[1].type).toBe(searchResults[0].type);
  });

  it('should update after entering a query and clicking on folder text from the search results', () => {
    const searchResults: CloudItem[] = [
      {
        id: '3',
        name: 'test text input',
        type: CloudItemType.Folder,
        modifiedAt: new Date(),
        canBeSelected: true,
        displayAsEnabled: true,
        displayKind: '',
        extension: '',
        icon: FolderIcon,
        path: [pathEntries]
      },
    ];
    searchPromise = MockPromises.getMockPromise(Promise).resolve(searchResults);
    spyOn(requestor, 'search').and.returnValue(searchPromise);

    const filterableDataGrid: ReactWrapper<FilterableDataGridProps, {}> = mount(
      <FilterableDataGrid {...mockFilterableDataGridProps}/>);
    executeRequestorPromises(enumerateItemsPromise);

    const mockTextInput = 'test text input';
    simulateTextInput(filterableDataGrid, mockTextInput);
    executeRequestorPromises(searchPromise);

    const bodyRow = filterableDataGrid.find(DataGrid).find(Body).find(BodyRow).first();
    const bodyCell = bodyRow.find(BodyCell).first();
    const folderText = bodyCell.find('.data-grid-body-cell-value');
    folderText.simulate('click');
    executeRequestorPromises(enumerateItemsPromise);

    // Breadcrumb should be 'D' -> 'test text input'
    const breadcrumb = filterableDataGrid.find(Breadcrumb);
    expect(breadcrumb.props().trail.length).toBe(2);
    expect(breadcrumb.props().trail[0]).toBe(pathEntries);
    expect(breadcrumb.props().trail[1].id).toBe(searchResults[0].id);
    expect(breadcrumb.props().trail[1].name).toBe(searchResults[0].name);
    expect(breadcrumb.props().trail[1].type).toBe(searchResults[0].type);
  });

});
