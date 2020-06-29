import React from "react";
import { mount } from 'enzyme';
import ServerLink from "../ServerLink/ServerLink";
import { BrowserRouter } from "react-router-dom";

describe('ServerLink', () => {
  it('displays an active state', () => {
    const wrapper = mount(
      <BrowserRouter>
        <ServerLink id={ 'foo' } />
      </BrowserRouter>
    );

    expect(wrapper.find('NavLink').prop('activeClassName')).toEqual('nav-channel-active');
  });
});