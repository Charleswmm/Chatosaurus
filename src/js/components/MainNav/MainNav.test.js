import { mount } from 'enzyme';
import React from 'react';
import { MemoryRouter, Route } from 'react-router';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import Config from '../../utilities/Config';
import DiscordStore from '../../utilities/DiscordStore';
import MainNav from './MainNav';

describe('MainNavButtons', () => {
  const spy = jest.spyOn(console, 'error');
  spy.mockImplementation(() => {});

  const fooConfiguration = {
    mainNavButtonTypes: {
      link: 'link',
    },
    discordUrls: '',
    discordAPIResources: {
      icons: 'foo',
    },
    mainNavButtons: [
      {
        type: 'add-server-button',
      },
      {
        type: 'link',
        id: 'bar',
      },
      {
        sort: 4,
      },
      {
        sort: 2,
      },
      {
        sort: 3,
      },
      {
        sort: 1,
      },
    ],
  };

  const foo = () => '/channels/bar';

  const fooConfig = new Config(fooConfiguration);
  const fooDiscordStore = new DiscordStore(fooConfig);

  const mockPromise = Promise.resolve([{
    id: '12345',
    name: 'mockGuild',
    icon: 'foo',
  }]);

  jest.spyOn(fooDiscordStore, 'getData').mockImplementation(() => mockPromise);

  const wrapper = mount(
    <GlobalContext.Provider value={{
      joinRoutePath: foo,
      Config: fooConfig,
      DiscordStore: fooDiscordStore,
    }}
    >
      <MemoryRouter initialEntries={['/foo']} initialIndex={0}>
        <Route component={MainNav} />
      </MemoryRouter>
    </GlobalContext.Provider>,
  );

  it('sorts mainNavButtons in order of the buttons sort value', () => {
    const getOrder = wrapper.find('MainNavButton').map((e) => e.prop('sort'));

    expect(getOrder).toEqual([1, 2, 3, 4]);
  });

  it('adds a server button component', () => {
    expect(wrapper.find('AddServerButton').exists()).toBeTruthy();
  });

  it('navigated to a section in the app, when I clicked on the button', () => {
    wrapper.find('a').simulate('click', {
      button: 0,
    });

    expect(wrapper.find('Router').prop('history').location.pathname).toEqual('/channels/bar');
  });

  it('displays my guilds and all of their detail (e.g title, avatar etc)', () => {
    const guilds = wrapper.find('ServerLink').findWhere((e) => e.prop('id') === '12345');

    expect(guilds.prop('id')).toBe('12345');
    expect(guilds.prop('name')).toBe('mockGuild');
    expect(guilds.prop('icon')).toBe('/foo/12345/foo');
  });
});
