import { mount } from 'enzyme';
import React from 'react';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import Config from '../../utilities/Config';
import ChatView from './ChatView';
import configuration from '../../config/app';

// Mocks react and overrides useEffect with a dummy function
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: () => null,
}));

describe('ChatView', () => {
  let fooConfig;
  const foo = 'foo';

  beforeEach(() => {
    fooConfig = new Config(configuration);
  });

  it('displays the top bar actions', () => {
    const wrapper = mount(
      <GlobalContext.Provider value={{ Config: fooConfig }}>
        <ChatView
          title={foo}
          avatarSrc={foo}
          backgroundColor={foo}
        />
      </GlobalContext.Provider>,
    );

    // Displays a top bar
    expect(wrapper.find('ChatTop').exists()).toBeTruthy();

    // Displays a top bar actions
    expect(wrapper.find('TopItems').exists()).toBeTruthy();
  });
});
