import { mount } from 'enzyme';
import React from 'react';
import axios from 'axios';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import Config from '../../utilities/Config';
import OAuthCallback from './OAuthCallback';

jest.mock('axios');

describe('OAuthCallback', () => {
  const fooConfiguration = {
    authDetails: {
      responseType: 'foo',
    },
    discordUrls: '',
    tokenTemplate: '',
  };

  let foo = false;
  let bin = '';

  const bar = ({ error }) => {
    foo = !error;

    return true;
  };

  const locationMock = {
    search: '?foo=theCode',
  };

  const historyMock = {
    push: bar,
  };

  const setItemMock = (fooParam, barParam) => {
    bin = JSON.parse(barParam);
    bin = bin.responseMock;
  };

  const sessionStorageMock = {
    setItem: setItemMock,
  };

  Object.defineProperty(window, 'sessionStorage', {
    value: sessionStorageMock,
  });

  axios.post.mockImplementation(() => Promise.resolve({
    data: {
      responseMock: 'bin',
    },
  }));

  const fooConfig = new Config(fooConfiguration);

  mount(
    <GlobalContext.Provider value={{
      Config: fooConfig,
    }}
    >
      <OAuthCallback location={locationMock} history={historyMock} />
    </GlobalContext.Provider>,

  );

  it('can get the code from the url and make an axios request', () => {
    expect(bin).toBe('bin');
    expect(foo).toBeTruthy();
  });
});
