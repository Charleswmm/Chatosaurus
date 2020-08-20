import { mount } from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router';
import moment from 'moment';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import Config from '../../utilities/Config';
import Auth from './Auth';

describe('Auth', () => {
  const fooConfiguration = {
    tokenTemplate: {
      accessTokenKey: 'access_token',
      expiresInKey: 'expires_in',
    },
  };

  const bin = {
    access_token: 'bar',
    expires_in: moment().unix(),
  };

  const getItemMock = () => JSON.stringify(bin);

  const sessionStorageMock = {
    getItem: getItemMock,
  };

  Object.defineProperty(window, 'sessionStorage', {
    value: sessionStorageMock,
  });

  const fooConfig = new Config(fooConfiguration);

  const wrapper = mount(
    <MemoryRouter initialEntries={['foo']} initialIndex={0}>
      <GlobalContext.Provider value={{
        Config: fooConfig,
      }}
      >
        <Auth />
      </GlobalContext.Provider>
    </MemoryRouter>,
  );

  it('checks the access token is valid', () => {
    expect(wrapper.find('Redirect').exists()).toBeFalsy();
  });
});
