import { mount } from 'enzyme';
import React from 'react';
import { MemoryRouter, Route } from 'react-router';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import Oauth from './Oauth';

describe('Oauth', () => {
  let bar;
  const foo = (baz) => {
    bar = baz;
    return null;
  };

  const callBackUrl = 'foo?code=bar';

  mount(
    <MemoryRouter initialEntries={[callBackUrl]} initialIndex={0}>
      <GlobalContext.Provider value={{ setAuthCodeInState: foo }}>
        <Route component={Oauth} />
      </GlobalContext.Provider>
    </MemoryRouter>,
  );

  it('captures the OAuth callback data', () => {
    expect(bar).toBe('bar');
  });
});
