import { mount } from 'enzyme';
import React from 'react';
import { MemoryRouter, Route } from 'react-router';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import Config from '../../utilities/Config';
import Login from './Login';

describe('Login', () => {
  const fooConfiguration = {
    clientDetails: {
      clientId: 'bar',
    },
    authDetails: {
      scope: 'bar',
      redirectUri: 'bar',
      responseType: 'bar',
    },
    discordUrls: {
      authUrl: 'foo',
    },
  };

  const fooConfig = new Config(fooConfiguration);

  const wrapper = mount(
    <MemoryRouter initialEntries={['foo']} initialIndex={0}>
      <GlobalContext.Provider value={{
        Config: fooConfig,
      }}
      >
        <Route component={Login} />
      </GlobalContext.Provider>
    </MemoryRouter>,
  );

  it('has a login button', () => {
    expect(wrapper.find('a').hasClass('login-button')).toBeTruthy();
  });

  it('redirects to the OAuth resource', () => {
    const hrefParts = wrapper.find('a').prop('href').split('?').shift();

    expect(hrefParts).toBe('foo');
  });
});
