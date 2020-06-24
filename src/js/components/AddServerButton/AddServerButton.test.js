import React from "react";
import { mount } from 'enzyme';
import AddServerButton from "./AddServerButton";
import { GlobalContext } from "../../contexts/GlobalContextWrapper";

// it adds a new server button, when I click on the add a server button

class MockedConfig {
  bin = {
    mainNavButtons: [
      {
        id: 'foo',
      },
    ],
    insertMainNavButtonsBeforeId: 'foo',
  };

  get = () => this.bin;

  set = (foo) => this.bin = foo;
}

describe('AddServerButton', () => {
  it('adds a new server button, when I click on the add a server button', () => {
    const Config = new MockedConfig;

    const mockValues = {
      state: {
        currentMainNavButtonId: '',
      }
    }

    const mockFoo = () => '';

    const wrapper = mount(
      <GlobalContext.Provider value={{ ...mockValues, Config: Config, setCurrentMainNavButtonId: mockFoo }} >
        <AddServerButton />
      </GlobalContext.Provider>
    );

    expect(Config.bin.mainNavButtons.filter((e) => e.id).length).toBe(1);

    wrapper.find('button').simulate('click')

    expect(Config.bin.mainNavButtons.filter((e) => e.id).length).toBe(2);
  });
});