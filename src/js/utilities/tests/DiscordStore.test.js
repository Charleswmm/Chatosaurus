import axios from 'axios';
import DiscordStore from '../DiscordStore';

jest.mock('axios');

describe('DiscordStore', () => {
  const mockData = {
    foo: 'foo',
    bar: 'bar',
  };

  it('constructs', () => {
    const discordStore = new DiscordStore(mockData);

    expect(discordStore).toBeInstanceOf(DiscordStore);
  });

  it('can get user data', () => {

  });
});
