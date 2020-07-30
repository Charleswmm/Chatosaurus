import { mount } from 'enzyme';
import React from 'react';
import configuration from '../../config/app';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import Config from '../../utilities/Config';
import ChatTop from './ChatTop';

describe('ChatTop', () => {
  const fooConfig = new Config(configuration);

  const wrapper = mount(
    <GlobalContext.Provider value={{
      Config: fooConfig,
    }}
    >
      <ChatTop />
    </GlobalContext.Provider>,
  );

  it('shows a tooltip that displays the action label in the top bar', () => {
    const actionTypes = [
      'voice-call',
      'video-call',
      'pin',
      'add-friend',
      'members',
      'inbox',
      'help',

    ];

    const actionLabels = [
      'Start Voice Call',
      'Start Video Call',
      'Pinned Messages',
      'Add Friends to DM',
      'Member List',
      'Inbox',
      'Help',
    ];

    // Tooltip action type
    const toolTipActionTypes = wrapper.find('IconButton').map((e) => e.props().type);

    expect(toolTipActionTypes).toEqual(expect.arrayContaining(actionTypes));

    // Tool tip display action text
    const toolTipActionText = wrapper.find('.tool-tip-text').map((e) => e.text());

    expect(toolTipActionText).toEqual(expect.arrayContaining(actionLabels));

    // Search Action
    expect(wrapper.find('TopSearch').exists()).toBeTruthy();
  });
});
