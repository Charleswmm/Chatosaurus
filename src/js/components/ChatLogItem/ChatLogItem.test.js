import { mount } from 'enzyme';
import React from 'react';
import ChatLogItem from './ChatLogItem';

describe('ChatLogItem', () => {
  const wrapper = mount(
    <ChatLogItem />,
  );

  it('log item action menu contains reaction edit and more', () => {
    expect(wrapper.find('ChatLogItemActions').exists()).toBeTruthy();
    expect(wrapper.find('.svg-reaction').exists()).toBeTruthy();
    expect(wrapper.find('.svg-edit').exists()).toBeTruthy();
    expect(wrapper.find('.svg-more').exists()).toBeTruthy();

    const actionToolTips = wrapper.find('.tool-tip-text').map((e) => e.text());
    actionToolTips.shift();

    expect(actionToolTips).toEqual(['Add Reaction', 'Edit', 'More']);
  });
});
