import { mount } from 'enzyme';
import React from 'react';
import ChatView from './ChatView';

describe('ChatView', () => {
  it('displays the top bar actions', () => {
    const wrapper = mount(
      <ChatView />,
    );

    // Displays a top bar
    expect(wrapper.find('ChatTop').exists()).toBeTruthy();

    // Displays a top bar actions
    expect(wrapper.find('TopButtons').exists()).toBeTruthy();
  });

  it('shows a tooltip that displays the action label', () => {
    const wrapper = mount(
      <ChatView />,
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
    const toolTipActionLabels = wrapper.find('TopButton').map((e) => e.props().tip);

    expect(toolTipActionLabels).toEqual(actionLabels);

    // Tool tip display action text
    const toolTipActionText = wrapper.find('.tool-tip-text').map((e) => e.text());

    expect(toolTipActionText).toEqual(actionLabels);

    // Search Action
    expect(wrapper.find('TopSearch').exists()).toBeTruthy();
  });
});
