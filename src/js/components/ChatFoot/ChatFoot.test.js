import { mount } from 'enzyme';
import React from 'react';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import Config from '../../utilities/Config';
import ChatFoot from './ChatFoot';

describe('ChatFoot', () => {
  const foo = 'foo';
  let baz = '';
  function bar(id, input) {
    baz = input;
  }

  const fooConfiguration = {
    [foo]: {
      messageLog: [
        {
          name: foo,
          timeStamp: foo,
          body: foo,
        },
      ],
    },
  };

  const fooConfig = new Config(fooConfiguration);

  const wrapper = mount(
    <GlobalContext.Provider value={{
      Config: fooConfig,
      state: { [foo]: { chatInput: foo } },
      setChatInputState: bar,
    }}
    >
      <ChatFoot id={foo} title={foo} />
    </GlobalContext.Provider>,
  );

  it('displays an input bar', () => {
    expect(wrapper.find('ChatInput').exists()).toBeTruthy();
    expect(wrapper.find('textarea').exists()).toBeTruthy();
  });

  it('displays a placeholder message on the input bar when the input bar is empty', () => {
    expect(wrapper.find('textarea').prop('placeholder')).toEqual('Message @foo');
  });

  it('has an input where I can input a message', () => {
    wrapper.find('textarea').simulate('change', { target: { value: foo } });

    expect(baz).toEqual(foo);
  });

  it('has my incomplete message still preserved in the DM input', () => {
    expect(wrapper.find('textarea').prop('value')).toEqual(foo);
  });

  it('displays an Add attachment, Gift, Gif and Emoji action on the input bar', () => {
    expect(wrapper.find('.chat-action-attach').exists()).toBeTruthy();
    expect(wrapper.find('.chat-action-gift').exists()).toBeTruthy();
    expect(wrapper.find('.chat-action-gif').exists()).toBeTruthy();
    expect(wrapper.find('.chat-action-emoji').exists()).toBeTruthy();
  });
});
