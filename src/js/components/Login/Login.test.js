import { mount } from 'enzyme';
import React from 'react';
import { MemoryRouter, Route } from 'react-router';
import Login from './Login';

describe('Login', () => {
  const callBackUrl = '?code=foo';

  let wrapper = mount(
    <MemoryRouter initialEntries={['foo']} initialIndex={0}>
      <Route component={Login} />
    </MemoryRouter>,
  );

  it('has a login button', () => {
    expect(wrapper.find('a').hasClass('login-button')).toBeTruthy();
  });

  it('redirects to the OAuth resource', () => {
    const hrefParts = wrapper.find('a').prop('href').split('/');

    expect(hrefParts).toEqual(expect.arrayContaining(['https:', 'discord.com', 'api', 'oauth2']));
  });

  it('captures the OAuth callback data', () => {
    wrapper = mount(
      <MemoryRouter initialEntries={[callBackUrl]} initialIndex={0}>
        <Route component={Login} />
      </MemoryRouter>,
    );

    expect(wrapper.find('Login').children().text()).toBe('foo');
  });
});
