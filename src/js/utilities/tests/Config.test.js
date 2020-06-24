import Config from "../Config";

describe('Config', () => {

  const mockData = {
    foo: 'foo',
    bar: 'bar',
  };

  it('constructs', () => {
      const config = new Config(mockData);

      expect(config).toBeInstanceOf(Config);
  });

  it('can get data', () => {
    const config = new Config(mockData);

    expect(config.get(['foo'])).toMatchObject({ foo: 'foo' });
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
