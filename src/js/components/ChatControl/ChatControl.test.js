import { mount } from 'enzyme';
import React from 'react';
import { MemoryRouter, Route } from 'react-router';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import Config from '../../utilities/Config';
import ChatControl from './ChatControl';

// Mocks react and overrides useEffect with a dummy function
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: () => null,
}));

describe('ChatControl', () => {
  const fooTimeStamp = '2020-07-07T19:15:30';
  const foo = 'foo';
  const bar = 'bar';

  const fooConfiguration = {
    currentUser:
      {
        UserName: foo,
        avatar: foo,
      },
    initialTimeStamp: '2000-01-01T00:00:00',
    iconButtons: [],
    chatRoomMessageLog: [
      {
        chatRoomId: foo,
        messageLog: [
          {
            name: 'bin',
            timeStamp: fooTimeStamp,
            body: 'baz',
          },
        ],
      },
    ],
    groupNavDMButtons: [
      {
        id: foo,
        title: bar,
      },
    ],
    chatTopButtons: [
      {
        id: foo,
      },
    ],
  };

  const fooConfig = new Config(fooConfiguration);

  const wrapper = mount(
    <GlobalContext.Provider value={{
      Config: fooConfig,
      state: {
        unSentMessage: ['foo'],
      },
    }}
    >
      <MemoryRouter initialEntries={[`${foo}`]} initialIndex={0}>
        <Route path=":id" component={ChatControl} />
      </MemoryRouter>
    </GlobalContext.Provider>,
  );

  it('can see the current DM recipient displayed in the top bar', () => {
    expect(wrapper.find('.nav-text').text()).toBe(bar);
  });

  it('displays the details in the URL to reflect the current DM log', () => {
    const currentDMLogId = wrapper.find('ChatView').prop('id');
    const currentURL = wrapper.find('Router').prop('history').location.pathname;

    expect(currentURL).toBe(currentDMLogId);
  });

  it('displays my incomplete message still preserved in the DM input', () => {
    const currentDMLogId = wrapper.find('ChatView').prop('id');
    const currentURL = wrapper.find('Router').prop('history').location.pathname;

    expect(currentURL).toBe(currentDMLogId);
  });
});
