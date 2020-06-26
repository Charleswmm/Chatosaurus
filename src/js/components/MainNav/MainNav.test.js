import React from "react";
import { mount } from 'enzyme';
import { MainNavButtons } from "./MainNav";
import Config from "../../utilities/Config";
import { GlobalContext } from "../../contexts/GlobalContextWrapper";

describe('MainNavButtons', () => {
  const fooConfiguration = {
    mainNavButtons: [
      { id: 'add-a-server' },
      { sort: 4 },
      { sort: 2 },
      { sort: 3 },
      { sort: 1 },
    ],
  };

  const fooValues = {
    state: {
      currentMainNavButtonId: '',
    }
  }

  let fooConfig;

  beforeEach(() => {
    fooConfig = new Config(fooConfiguration)
  })

  it('sorts mainNavButtons in order of the buttons sort value', () => {
    const wrapper = mount(
      <GlobalContext.Provider value={{ ...fooValues, Config: fooConfig }} >
        <MainNavButtons />
      </GlobalContext.Provider>
    );

    // compares the sort number to the previous component's sort number to check if they are in numerical order
    const checkOrder = wrapper.find('MainNavButton').reduce((prev, curr) => {
      return prev === false
        ? false
        : (prev < curr.prop('sort'))
          ? curr.prop('sort')
          : false;
    }, 0)

    expect(checkOrder).toBeTruthy()
  });

  it('adds a server button component', () => {
    const wrapper = mount(
      <GlobalContext.Provider value={{ ...fooValues, Config: fooConfig }} >
        <MainNavButtons />
      </GlobalContext.Provider>
    );

    expect(wrapper.find('AddServerButton').exists()).toBeTruthy()
  });
});