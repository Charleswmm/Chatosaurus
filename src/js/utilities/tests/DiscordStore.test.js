import axios from 'axios';
import Config from '../Config';
import DiscordStore from '../DiscordStore';

jest.mock('axios');

describe('DiscordStore', () => {
  const fooConfiguration = {
    discordUrls: '',
    discordAPIResources: {
      client: 'bar',
      wait: '',
    },
    tokenTemplate: '',
  };

  const fooConfig = new Config(fooConfiguration);
  const discordStore = new DiscordStore(fooConfig);

  const bin = {
    access_token: 'foo',
    token_type: 'bar',
  };

  const getItemMock = () => JSON.stringify(bin);

  const sessionStorageMock = {
    getItem: getItemMock,
  };

  Object.defineProperty(window, 'sessionStorage', {
    value: sessionStorageMock,
  });

  axios.get.mockImplementation(() => Promise.resolve({
    data: 'bin',
  }));

  it('constructs', () => {
    expect(discordStore).toBeInstanceOf(DiscordStore);
  });

  it('can get data', () => expect(
    discordStore.getData('foo', 'bar').then((e) => e),
  ).resolves.toBe('bin'));
});
