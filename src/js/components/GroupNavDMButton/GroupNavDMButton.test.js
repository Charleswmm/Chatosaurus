import { mount } from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import GroupNavDMButton from './GroupNavDMButton';

describe('GroupNavDMButton', () => {
  const foo = (id) => ['/channels', ...id].join('/');

  // "Direct message" component is the "GroupNavDMButton" component
  it('displays a remove button on the Direct message component', () => {
    const wrapper = mount(
      <GlobalContext.Provider value={{ joinBaseRoute: foo }}>
        <MemoryRouter initialEntries={['/channels/foo']} initialIndex={0}>
          <GroupNavDMButton title="foo" />
        </MemoryRouter>
      </GlobalContext.Provider>,
    );

    expect(wrapper.find('.svg').hasClass('svg-cross')).toBeTruthy();
  });

  it('displays an active state and matched the current DM log', () => {
    const wrapper = mount(
      <GlobalContext.Provider value={{ joinBaseRoute: foo }}>
        <MemoryRouter initialEntries={['/channels/']} initialIndex={0}>
          <GroupNavDMButton id="foo" />
        </MemoryRouter>
      </GlobalContext.Provider>,
    );

    wrapper.find('a').simulate('click', { button: 0 });

    const currentDMLogId = wrapper.find('GroupNavDMButton').prop('id');

    expect(wrapper.find('a').hasClass('nav-link-active')).toBeTruthy();
    expect(wrapper.find('a').prop('href').split('/').pop()).toBe(currentDMLogId);
  });

  it('navigated to the view for that DM log, when I click a secondary nav item', () => {
    const wrapper = mount(
      <GlobalContext.Provider value={{ joinBaseRoute: foo }}>
        <MemoryRouter initialEntries={['/channels/']} initialIndex={0}>
          <GroupNavDMButton id="foo" />
        </MemoryRouter>
      </GlobalContext.Provider>,
    );

    wrapper.find('a').simulate('click', { button: 0 });

    expect(wrapper.find('Router').prop('history').location.pathname).toEqual('/channels/@me/foo');
  });
});
