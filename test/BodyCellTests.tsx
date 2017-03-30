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
import { BodyCellProps, BodyCell } from '../src/components/BodyCell';
import { IconDefinition } from '../src/types/IconTypes';
import { shallow, ShallowWrapper } from 'enzyme';

describe('Body cell', () => {

  it('should render its value', () => {
    const mockIconDefinition: IconDefinition = { source: 'hi there' };
    const mockBodyCellProps = {
      value: 'random value',
      width: '42px',
      hasBorder: true,
      icon: mockIconDefinition,
      testValueUniqueCellId: 'r1c0',
      handleFolderTextClicked: () => { return; }
    };
    const wrapper: ShallowWrapper<BodyCellProps, {}> = shallow(<BodyCell { ...mockBodyCellProps } />);
    const cellValue = wrapper.find('.data-grid-body-cell');

    expect(cellValue.length).toBe(1);
    expect(cellValue.first().text()).toContain(mockBodyCellProps.value);
  });

  it('should render its icon', () => {
    const mockIconDefinition: IconDefinition = { source: 'hi there' };
    const mockBodyCellProps = {
      value: 'random value',
      width: '42px',
      hasBorder: true,
      icon: mockIconDefinition,
      testValueUniqueCellId: 'r1c0',
      handleFolderTextClicked: () => { return; }
    };
    const wrapper: ShallowWrapper<BodyCellProps, {}> = shallow(<BodyCell { ...mockBodyCellProps } />);
    const cellValue = wrapper.find('.data-grid-body-cell');

    expect(cellValue.length).toBe(1);
    expect(cellValue.first().text()).toContain('<Icon />');
  });

});
