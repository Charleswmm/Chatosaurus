import { mount } from 'enzyme';
import React from 'react';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import Config from '../../utilities/Config';
import ChatBody from './ChatBody';

// Mocks react and overrides useEffect with a dummy function
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: () => null,
}));

describe('ChatBody', () => {
  const fooTimeStamp = '2020-07-07T19:15:30';

  const fooConfiguration = {
    currentUser:
    {
      UserName: 'foo',
      avatar: 'foo',
    },
    initialTimeStamp: '2000-01-01T00:00:00',
    messageLog: [
      {
        name: 'foo',
        timeStamp: fooTimeStamp,
        body: 'foo',
      },
    ],
  };

  const fooConfig = new Config(fooConfiguration);

  const wrapper = mount(
    <GlobalContext.Provider value={{ Config: fooConfig }}>
      <ChatBody />
    </GlobalContext.Provider>,
  );

  it('displays a DM Log', () => {
    expect(wrapper.find('ChatLogControl').exists()).toBeTruthy();
    expect(wrapper.find('ChatLogItemDateDivider').exists()).toBeTruthy();
    expect(wrapper.find('ChatLogItemStart').exists()).toBeTruthy();
  });

  it('displays DM a log entry with the time of the log item and an image that identifies who a'
    + ' log item is from', () => {
    // Displays DM a log entry
    expect(wrapper.find('ChatLogItemStart').exists()).toBeTruthy();

    // The time of the log item
    expect(wrapper.find('.message-time').find('span').first().text()).toBeTruthy();

    const logItemDate = wrapper.find('.message-time').find('span').first().text();

    const fooDate = new Date(fooTimeStamp);
    fooDate.setHours(0, 0, 0, 0);

    expect(new Date(logItemDate)).toEqual(fooDate);

    // An image that identifies who a log item is from
    const avatarUrl = wrapper.find('.message-tab').find('.avatar').prop('style').backgroundImage;

    expect((avatarUrl)).toEqual('url(foo)');
  });

  it('displays a  divider denoting the date', () => {
    expect(wrapper.find('.chat-log-divider').exists()).toBeTruthy();
    expect(wrapper.find('.log-divider-day').text()).toBeTruthy();

    const dividerDate = wrapper.find('.log-divider-day').text();

    const fooDate = new Date(fooTimeStamp);
    fooDate.setHours(0, 0, 0, 0);

    expect(new Date(dividerDate)).toEqual(fooDate);
  });
});
