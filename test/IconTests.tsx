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
import { IconProps, Icon } from '../src/components/Icon';
import { shallow, ShallowWrapper } from 'enzyme';

describe('Icon', () => {

  it('should render its value', () => {
    const mockIconProps: IconProps = {
      source: 'hi there',
      style: {}
    };
    const wrapper: ShallowWrapper<IconProps, {}> = shallow(
      <Icon source={mockIconProps.source} style={mockIconProps.style} />
    );

    expect(wrapper.length).toBe(1);
    expect(wrapper.first().html()).toContain(`src="${mockIconProps.source}"`);
  });

});
