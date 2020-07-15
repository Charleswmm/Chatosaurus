import { mount } from 'enzyme';
import React from 'react';
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
    currentUser:
      {
        UserName: foo,
        avatar: foo,
      },
    [foo]: {
      messageLog: [
        {
          name: foo,
          timeStamp: '2000-01-01T00:00:00',
          body: foo,
        },
      ],
    },
    chatTopButtons: [
      {
        title: foo,
        iconClass: foo,
      },
    ],
  };

  const fooConfig = new Config(fooConfiguration);
  const wrapper = mount(
    <GlobalContext.Provider value={{ Config: fooConfig, state: foo }}>
      <ChatView
        id={foo}
        title={foo}
        avatarSrc={foo}
        backgroundColor={foo}
      />
    </GlobalContext.Provider>,
  );

  it('displays the top bar actions', () => {
    // Displays a top bar
    expect(wrapper.find('ChatTop').exists()).toBeTruthy();

    // Displays a top bar actions
    expect(wrapper.find('TopItems').exists()).toBeTruthy();
  });
});
