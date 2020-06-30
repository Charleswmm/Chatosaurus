import { mount } from 'enzyme';
import React from 'react';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import GroupNavDMButton from './GroupNavDMButton';

describe('GroupNavDMButton', () => {
  const fooValues = {
    state: {
      currentGroupNavDMButtonId: 'foo',
    },
  };

  // "Direct message" component is the "GroupNavDMButton" component
  it('displays a remove button on the Direct message component', () => {
    const wrapper = mount(
      <GlobalContext.Provider value={fooValues}>
        <GroupNavDMButton title="foo" />
      </GlobalContext.Provider>,
    );

    expect(wrapper.find('.svg').hasClass('svg-cross')).toBeTruthy();
  });

  it('displays an active state', () => {
    const wrapper = mount(
      <GlobalContext.Provider value={fooValues}>
        <GroupNavDMButton id="foo" />
      </GlobalContext.Provider>,
    );

    expect(wrapper.find('.nav-btn').hasClass('nav-btn-active')).toBeTruthy();
  });
});
