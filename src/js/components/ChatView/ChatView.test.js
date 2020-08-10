import { mount } from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import Config from '../../utilities/Config';
import ChatView from './ChatView';

// Mocks react and overrides useEffect with a dummy function
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: () => null,
}));

describe('ChatView', () => {
  const foo = 'foo';

  const fooConfiguration = {
    discordAPIResources: '',
    currentUser:
      {
        UserName: foo,
        avatar: foo,
      },
    iconButtons: [],
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
    chatTopButtons: [
      {
        title: foo,
        iconClass: foo,
      },
    ],
  };

  const fooConfig = new Config(fooConfiguration);
  const wrapper = mount(
    <MemoryRouter>
      <GlobalContext.Provider value={{
        Config: fooConfig,
        state: {
          unSentMessage: ['foo'],
        },
      }}
      >
        <ChatView
          id={foo}
          title={foo}
          avatarSrc={foo}
          backgroundColor={foo}
        />
      </GlobalContext.Provider>
    </MemoryRouter>,
  );

  it('displays the top bar actions', () => {
    // Displays a top bar
    expect(wrapper.find('ChatTop').exists()).toBeTruthy();

    // Displays a top bar actions
    expect(wrapper.find('TopIcons').exists()).toBeTruthy();
  });
});
