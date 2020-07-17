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
    iconButtons: [
      { type: 'add' },
      { type: 'gift' },
      { type: 'gif' },
      { type: 'emoji' },
    ],
    chatRoomMessageLog: [
      {
        chatRoomId: foo,
        messageLog: [
          {
            name: 'bin',
            timeStamp: '2020-07-07T19:15:30',
            body: 'baz',
          },
        ],
      },
    ],
  };

  const fooConfig = new Config(fooConfiguration);

  const wrapper = mount(
    <GlobalContext.Provider value={{
      Config: fooConfig,
      state: {
        unSentMessage: [
          {
            chatId: foo,
            chatInput: foo,
          },
        ],
      },
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
    expect(wrapper.find('.svg-add').exists()).toBeTruthy();
    expect(wrapper.find('.svg-gif').exists()).toBeTruthy();
    expect(wrapper.find('.svg-gift').exists()).toBeTruthy();
    expect(wrapper.find('.svg-emoji').exists()).toBeTruthy();
  });
});
