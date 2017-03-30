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

import { HeaderCellProps, HeaderCell } from '../src/components/HeaderCell';
import { IconDefinition } from '../src/types/IconTypes';
import { Row } from '../src/types/DataGridTypes';
import { shallow, ShallowWrapper } from 'enzyme';

describe('Header cell', () => {

  it('should render its value', () => {
    const mockIconDefinition: IconDefinition = { source: '' };
    const mockHeaderCellProps = {
      column: {
        id: 0,
        title: 'A',
        width: '42px',
        hasBorder: false,
        getIconFromRow: (row: Row) => mockIconDefinition,
        getCellFromRow: (row: Row) => ''
      },
      onColumnSelected: (columnId: number) => { return; }
    };
    const wrapper: ShallowWrapper<HeaderCellProps, {}> = shallow(<HeaderCell { ...mockHeaderCellProps } />);
    expect(wrapper.childAt(0).text()).toBe(mockHeaderCellProps.column.title);
  });

});
