import { mount } from 'enzyme';
import React from 'react';
import { MemoryRouter, Route } from 'react-router';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import Config from '../../utilities/Config';
import ChatControl from './ChatControl';

describe('ChatControl', () => {
  const foo = 'foo';

  const fooConfiguration = {
    groupNavDMButtons: [
      {
        id: foo,
        title: 'bar',
      },
    ],
  };

  let fooConfig;

  beforeEach(() => {
    fooConfig = new Config(fooConfiguration);
  });

  it('can see the current DM recipient displayed in the top bar', () => {
    const wrapper = mount(
      <GlobalContext.Provider value={{ Config: fooConfig }}>
        <MemoryRouter initialEntries={[`${foo}`]} initialIndex={0}>
          <Route path=":id" component={ChatControl} />
        </MemoryRouter>
      </GlobalContext.Provider>,
    );

    expect(wrapper.find('.nav-text').text()).toBe('bar');
  });

  it('displays the details in the URL to reflect the current DM log', () => {
    const wrapper = mount(
      <GlobalContext.Provider value={{ Config: fooConfig }}>
        <MemoryRouter initialEntries={[`${foo}`]} initialIndex={0}>
          <Route path=":id" component={ChatControl} />
        </MemoryRouter>
      </GlobalContext.Provider>,
    );

    const currentDMLogId = wrapper.find('ChatView').prop('button').id;

    const currentURL = wrapper.find('Router').prop('history').location.pathname;

    expect(currentURL).toBe(currentDMLogId);
  });
});
