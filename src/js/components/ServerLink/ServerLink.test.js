import React from "react";
import { mount } from 'enzyme';
import ServerLink from "../ServerLink/ServerLink";
import { MemoryRouter } from "react-router";

describe('ServerLink', () => {
  it('displays an active state', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/channels/foo']} initialIndex={0}>
        <ServerLink id={ 'foo' } />
      </MemoryRouter>
    );

    expect(wrapper.find('a').hasClass('nav-channel-active')).toBeTruthy();
  });
});