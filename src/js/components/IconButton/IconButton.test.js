import { mount } from 'enzyme';
import React from 'react';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import Config from '../../utilities/Config';
import IconButton from './IconButton';

describe('IconButton', () => {
  const foo = 'foo';
  const bar = 'bar';

  const fooConfiguration = {
    iconButtons: [
      {
        type: foo,
        toolTipText: bar,
      },
    ],
  };

  const fooConfig = new Config(fooConfiguration);

  const wrapper = mount(
    <GlobalContext.Provider value={{
      Config: fooConfig,
    }}
    >
      <IconButton type="foo" />
    </GlobalContext.Provider>,
  );

  it('displays a SVG icon that represents the action', () => {
    expect(wrapper.find('.svg').hasClass('svg-foo')).toBeTruthy();
  });

  it('displays a tooltip with text that represent the action', () => {
    expect(wrapper.find('IconButton').prop('type')).toBe(foo);
    expect(wrapper.find('.tool-tip-text').text()).toBe(bar);
  });
});
