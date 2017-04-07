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
import { HeaderCell } from '../src/components/HeaderCell';
import { HeaderRowProps, HeaderRow } from '../src/components/HeaderRow';
import { shallow, ShallowWrapper } from 'enzyme';
import { SortOrder } from '../src/types/SortOrderTypes';

describe('Header row', () => {

  it('should render header cells', () => {
    const mockHeaderRowProps = {
      onColumnSelected: (columnId: number) => { return; },
      sortableColumnId: 0,
      sortOrder: SortOrder.ascending
    };

    const wrapper: ShallowWrapper<HeaderRowProps, {}> = shallow(<HeaderRow { ...mockHeaderRowProps } />);
    expect(wrapper.find(HeaderCell).length).toBe(3);
  });

});
