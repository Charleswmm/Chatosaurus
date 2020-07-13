import { mount } from 'enzyme';
import React from 'react';
import configuration from '../../config/app';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import Config from '../../utilities/Config';
import ChatTop from './ChatTop';

describe('ChatTop', () => {
  const fooConfig = new Config(configuration);

  const wrapper = mount(
    <GlobalContext.Provider value={{ Config: fooConfig }}>
      <ChatTop />
    </GlobalContext.Provider>,
  );

  it.only('shows a tooltip that displays the action label in the top bar', () => {
    const actionLabels = [
      'Start Voice Call',
      'Start Video Call',
      'Pinned Messages',
      'Add Friends to DM',
      'Member List',
      'Inbox',
      'Help',
    ];

    // Tooltip action label
    const toolTipActionLabels = wrapper.find('TopItem').map((e) => e.props().title);

    expect(toolTipActionLabels).toEqual(actionLabels);

    // Tool tip display action text
    const toolTipActionText = wrapper.find('.tool-tip-text').map((e) => e.text());

    expect(toolTipActionText).toEqual(actionLabels);

    // Search Action
    expect(wrapper.find('TopSearch').exists()).toBeTruthy();
  });
});
