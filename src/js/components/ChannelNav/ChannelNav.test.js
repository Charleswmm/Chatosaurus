import { mount } from 'enzyme';
import React from 'react';
import { MemoryRouter, Route } from 'react-router';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import Config from '../../utilities/Config';
import DiscordStore from '../../utilities/DiscordStore';
import ChannelNav from './ChannelNav';

describe('ChannelNav', () => {
  const spy = jest.spyOn(console, 'error');
  spy.mockImplementation(() => {});

  const fooConfiguration = {
    channelNavButtonClasses: '',
    discordAPIResources: {
      parentChannel: 4,
      textChannel: 0,
      voiceChannel: 2,
    },
    discordUrls: '',
    iconButtons: [],
  };

  const foo = () => 'foo';

  const fooConfig = new Config(fooConfiguration);
  const fooDiscordStore = new DiscordStore(fooConfig);

  const mockPromise = Promise.resolve([
    {
      guild_id: '12345',
      id: '12345',
      name: 'Parent',
      type: 4,
    },
    {
      id: '12347',
      name: 'Text Channel',
      parent_id: '12345',
      type: 0,
    },
    {
      id: '12346',
      name: 'Voice Channel',
      parent_id: '12345',
      type: 0,
    },
  ]);

  jest.spyOn(fooDiscordStore, 'getData').mockImplementation(() => mockPromise);

  const wrapper = mount(
    <GlobalContext.Provider value={{
      joinRoutePath: foo,
      Config: fooConfig,
      DiscordStore: fooDiscordStore,
    }}
    >
      <MemoryRouter initialEntries={['/12345']} initialIndex={0}>
        <Route path="/:guild" component={ChannelNav} />
      </MemoryRouter>
    </GlobalContext.Provider>,
  );

  it('displays a side nav for the guild view', () => {
    wrapper.update();

    expect(wrapper.find('ChannelNavParent').exists()).toBeTruthy();
    expect(wrapper.find('ChannelNavButtons').exists()).toBeTruthy();
  });

  it('displays a text channels in the guild', () => {
    const channelNavButton = wrapper.find('ChannelNavButton');
    const textChannel = channelNavButton.findWhere((n) => n.text().includes('Text Channel'));

    expect(textChannel.exists()).toBeTruthy();
    expect(wrapper.find('ChannelNavButton').exists()).toBeTruthy();
  });

  it('displays a voice channels in the guild', () => {
    const channelNavButton = wrapper.find('ChannelNavButton');
    const voiceChannel = channelNavButton.findWhere((n) => n.text().includes('Voice Channel'));

    expect(voiceChannel.exists()).toBeTruthy();
    expect(wrapper.find('ChannelNavButton').exists()).toBeTruthy();
  });

  it('navigates to the DM log for that channel', () => {
    const channelNavButton = wrapper.find('ChannelNavButton');
    const channel = channelNavButton.findWhere((n) => n.text().includes('Text Channel'));

    expect(channel.find('ChannelNavButton').exists()).toBeTruthy();
    expect(channel.find('NavLink').exists()).toBeTruthy();
    expect(channel.find('Link').exists()).toBeTruthy();
    expect(channel.find('LinkAnchor').exists()).toBeTruthy();
    expect(channel.find('a').exists()).toBeTruthy();
  });
});
