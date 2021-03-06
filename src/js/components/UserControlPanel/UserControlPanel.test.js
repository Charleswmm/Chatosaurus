import { mount } from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import Config from '../../utilities/Config';
import UserControlPanel from './UserControlPanel';
import DiscordStore from '../../utilities/DiscordStore';

describe('UserControlPanel', () => {
  const spy = jest.spyOn(console, 'error');
  spy.mockImplementation(() => {});

  const fooConfiguration = {
    discordAPIResources: {
      avatarPath: 'avatars',
    },
    discordUrls: {
      appCDN: 'foo',
    },
    iconButtons: [
      {
        type: 'mic',
      },
      {
        type: 'deafen',
      },
      {
        type: 'cog',
      },
    ],
  };

  const fooConfig = new Config(fooConfiguration);
  const fooDiscordStore = new DiscordStore(fooConfig);

  const mockPromise = Promise.resolve({
    avatar: 'avatar',
    username: 'username',
    discriminator: 'discriminator',
    id: 'id',
  });

  jest.spyOn(fooDiscordStore, 'getData').mockImplementation(() => mockPromise);

  const wrapper = mount(
    <MemoryRouter>
      <GlobalContext.Provider value={{
        Config: fooConfig,
        DiscordStore: fooDiscordStore,
      }}
      >
        <UserControlPanel />
      </GlobalContext.Provider>
    </MemoryRouter>,
  );

  it('displays a user name', () => {
    expect(wrapper.find('.user-control-text').text()).toEqual('username');
  });

  it('displays a user ID', () => {
    expect(wrapper.find('.user-control-subtext').text()).toEqual('#discriminator');
  });

  it('displays control actions, their tooltips', () => {
    // displays control actions
    expect(wrapper.find('.user-control-actions').exists()).toBeTruthy();
    const micOnAction = wrapper.find('.svg-mic-on');
    const micOffAction = wrapper.find('.svg-mic-off');
    const deafenOnAction = wrapper.find('.svg-deafen-on');
    const deafenOffAction = wrapper.find('.svg-deafen-off');

    expect(micOnAction.exists() || micOffAction.exists()).toBeTruthy();
    expect(deafenOnAction.exists() || deafenOffAction.exists()).toBeTruthy();
    expect(wrapper.find('.svg-cog').exists()).toBeTruthy();

    // displays their tooltips
    const actionToolTips = wrapper.find('.tool-tip-text').map((e) => e.text());
    actionToolTips.shift();

    expect(expect.arrayContaining(actionToolTips)).toEqual(['Mute', 'User Settings', 'Deafen', 'Unmute', 'Undeafen']);
  });

  it('toggles to mute or unmute with the mic icon', () => {
    const iconButton = wrapper.find('IconButton').findWhere((e) => e.prop('type') === 'mic');
    iconButton.simulate('click');
    const iconButtonUpdated = wrapper.find('IconButton').findWhere((e) => e.prop('type') === 'mic');

    expect(iconButtonUpdated.prop('toggleState')).toEqual('off');
    expect(iconButtonUpdated.childAt(0).childAt(0).hasClass('svg-mic-off')).toBeTruthy();
  });

  it('toggles to deafen or undeafen with the deafen icon', () => {
    const iconButton = wrapper.find('IconButton').findWhere((e) => e.prop('type') === 'deafen');
    iconButton.simulate('click');
    const iconButtonUpdated = wrapper.find('IconButton').findWhere((e) => e.prop('type') === 'deafen');

    expect(iconButtonUpdated.prop('toggleState')).toEqual('on');
    expect(iconButtonUpdated.childAt(0).childAt(0).hasClass('svg-deafen-on')).toBeTruthy();
  });

  it('displays a user profile image', () => {
    const avatarUrl = wrapper.find('.user-control-avatar').prop('style').backgroundImage;
    expect(avatarUrl).toEqual('url(foo/avatars/id/avatar)');
  });
});
