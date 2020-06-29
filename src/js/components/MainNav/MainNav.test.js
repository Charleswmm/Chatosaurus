import React from "react";
import { mount } from 'enzyme';
import { MainNavButtons } from "./MainNav";
import Config from "../../utilities/Config";
import { GlobalContext } from "../../contexts/GlobalContextWrapper";
import { BrowserRouter } from "react-router-dom";
import {MemoryRouter} from "react-router";

describe('MainNavButtons', () => {
  const fooConfiguration = {
    mainNavButtons: [
      { type: 'add-server-button' },
      {
        type: 'link',
        id: 'bar'
      },
      { sort: 4 },
      { sort: 2 },
      { sort: 3 },
      { sort: 1 },
    ],
  };

  let fooConfig;

  beforeEach(() => {
    fooConfig = new Config(fooConfiguration)
  })

  it('sorts mainNavButtons in order of the buttons sort value', () => {
    const wrapper = mount(
      <GlobalContext.Provider value={{ Config: fooConfig }} >
        <BrowserRouter>
          <MainNavButtons />
        </BrowserRouter>
      </GlobalContext.Provider>
    );

    const getOrder = wrapper.find('MainNavButton').map((e) => e.prop('sort'));

    expect(getOrder).toEqual([ 1, 2, 3, 4 ])
  });

  it('adds a server button component', () => {
    const wrapper = mount(
      <GlobalContext.Provider value={{ Config: fooConfig }} >
        <BrowserRouter>
          <MainNavButtons />
        </BrowserRouter>
      </GlobalContext.Provider>
    );

    expect(wrapper.find('AddServerButton').exists()).toBeTruthy()
  });

  it('navigated to a section in the app, when I clicked on the button', () => {
    const wrapper = mount(
      <GlobalContext.Provider value={{ Config: fooConfig }} >
        <MemoryRouter initialEntries={['/foo']}  initialIndex={0} >
          <MainNavButtons />
        </MemoryRouter>
      </GlobalContext.Provider>
    );

    wrapper.find('a').simulate('click', { button: 0 });

    expect(wrapper.find('Router').prop('history').location.pathname).toEqual('/channels/bar');
  });
});