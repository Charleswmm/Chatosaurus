import { mount } from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import ServerLink from './ServerLink';

describe('ServerLink', () => {
  it('displays an active state', () => {
    const foo = () => '';

    const wrapper = mount(
      <GlobalContext.Provider value={{
        joinRoutePath: foo,
      }}
      >
        <MemoryRouter initialEntries={['/channels/foo']} initialIndex={0}>
          <ServerLink id="foo" />
        </MemoryRouter>
      </GlobalContext.Provider>,
    );

    expect(wrapper.find('a').hasClass('nav-channel-active')).toBeTruthy();
  });
});
