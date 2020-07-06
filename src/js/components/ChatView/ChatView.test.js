import { mount } from 'enzyme';
import React from 'react';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import Config from '../../utilities/Config';
import ChatView from './ChatView';
import configuration from '../../config/app';

describe('ChatView', () => {
  let fooConfig;

  beforeEach(() => {
    fooConfig = new Config(configuration);
  });

  it('displays the top bar actions', () => {
    const wrapper = mount(
      <GlobalContext.Provider value={{ Config: fooConfig }}>
        <ChatView />
      </GlobalContext.Provider>,
    );

    // Displays a top bar
    expect(wrapper.find('ChatTop').exists()).toBeTruthy();

    // Displays a top bar actions
    expect(wrapper.find('TopItems').exists()).toBeTruthy();
  });

  it('shows a tooltip that displays the action label', () => {
    const wrapper = mount(
      <GlobalContext.Provider value={{ Config: fooConfig }}>
        <ChatView />
      </GlobalContext.Provider>,
    );

    const actionLabels = [
      'Start Voice Call',
      'Start Video Call',
      'Pinned Messages',
      'Add Friends to DM',
      'Member List',
      'Inbox',
      'Help',
    ];

    // console.log(wrapper.debug());

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
