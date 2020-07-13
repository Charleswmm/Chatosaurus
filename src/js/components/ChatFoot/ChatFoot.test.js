import { mount } from 'enzyme';
import React from 'react';
import ChatFoot from './ChatFoot';

describe('ChatFoot', () => {
  const foo = 'foo';

  const wrapper = mount(
    <ChatFoot title="foo" />,
  );

  it('displays an input bar', () => {
    expect(wrapper.find('ChatInput').exists()).toBeTruthy();
    expect(wrapper.find('textarea').exists()).toBeTruthy();
  });

  it('displays a placeholder message on the input bar when the input bar is empty', () => {
    expect(wrapper.find('textarea').prop('placeholder')).toEqual('Message @foo');
  });

  it('has an input where I can input a message', () => {
    wrapper.find('textarea').simulate('change', { target: { name: 'chatInput', value: foo } });
    expect(wrapper.find('textarea').prop('value')).toEqual(foo);
  });

  it('displays an Add attachment, Gift, Gif and Emoji action on the input bar', () => {
    expect(wrapper.find('.chat-action-attach').exists()).toBeTruthy();
    expect(wrapper.find('.chat-action-gift').exists()).toBeTruthy();
    expect(wrapper.find('.chat-action-gif').exists()).toBeTruthy();
    expect(wrapper.find('.chat-action-emoji').exists()).toBeTruthy();
  });
});
