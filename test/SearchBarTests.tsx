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
import { SearchBarProps, SearchBar } from '../src/components/SearchBar';
import { SearchFieldWidget } from 'shared-widgets';
import { shallow, ShallowWrapper } from 'enzyme';

describe('Search bar', () => {

  const handleEnterSpy: jasmine.Spy = jasmine.createSpy('handle enter spy');

  const mockSearchBarProps = {
    displayText: '',
    resetQuery: true,
    handleCancel: () => { return; },
    handleEnter: () => handleEnterSpy(),
    isSearchDisabled: () => { return Promise.resolve(false); }
  };

  describe('rendering', () => {

    it('should contain no text on initial render', () => {
      const wrapper: ShallowWrapper<SearchBarProps, {}> = shallow(<SearchBar { ...mockSearchBarProps } />);
      const textField = wrapper.find(SearchFieldWidget);
      expect(textField.props().text).toBe('');
    });

    it('should render a search field widget', () => {
      const wrapper: ShallowWrapper<SearchBarProps, {}> = shallow(<SearchBar { ...mockSearchBarProps } />);
      expect(wrapper.find(SearchFieldWidget).length).toBe(1);
    });

  });

});
