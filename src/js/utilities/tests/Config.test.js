import Config from '../Config';

describe('Config', () => {
  const mockData = {
    foo: 'foo',
    bar: 'bar',
  };

  let consoleOut = [];

  const mockedConsoleWarn = (output) => consoleOut.push(output);

  beforeEach(() => {
    // Reset consoleOut
    consoleOut = [];
    // Mock console.warn()
    // eslint-disable-next-line no-console
    console.warn = mockedConsoleWarn;
  });

  it('constructs', () => {
    const config = new Config(mockData);

    expect(config).toBeInstanceOf(Config);
  });

  it('can get data', () => {
    const config = new Config(mockData);

    expect(config.get(['foo'])).toMatchObject({ foo: 'foo' });
  });

  it('ommits undefined fields', () => {
    const config = new Config(mockData);

    expect(config.get(['foo', 'bin'])).toMatchObject({ foo: 'foo' });
    expect(consoleOut).toContain('\'bin\' is not available in the config');
  });

  it('can set data', () => {
    const config = new Config(mockData);
    const extraData = {
      bin: 'bin',
    };

    config.set(extraData);

    expect(config.get(['bin'])).toMatchObject(extraData);
  });
});
