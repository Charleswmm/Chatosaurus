import { mount } from 'enzyme';
import React from 'react';
import { MemoryRouter, Route } from 'react-router';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import Config from '../../utilities/Config';
import Oauth from './Oauth';

describe('Oauth', () => {
  let bar;
  const foo = (baz) => {
    bar = baz;
    return null;
  };

  const fooConfiguration = {
    authDetails: {
      responseType: 'code',
    },
  };

  const fooConfig = new Config(fooConfiguration);

  const callBackUrl = 'foo?code=bar';

  mount(
    <MemoryRouter initialEntries={[callBackUrl]} initialIndex={0}>
      <GlobalContext.Provider value={{ setAuthCodeInState: foo, Config: fooConfig }}>
        <Route component={Oauth} />
      </GlobalContext.Provider>
    </MemoryRouter>,
  );

  it('captures the OAuth callback data', () => {
    expect(bar).toBe('bar');
  });
});
