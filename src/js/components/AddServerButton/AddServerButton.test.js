import { mount } from 'enzyme';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import Config from '../../utilities/Config';
import AddServerButton from './AddServerButton';

describe('AddServerButton', () => {
  const fooConfiguration = {
    mainNavButtons: [
      {
        id: 'foo',
        sort: 1,
      },
    ],
    insertMainNavButtonsBeforeId: 'foo',
    mainNavButtonPlaceholderImageSrc: '../../foobar.png',
  };

  const foo = () => '';

  it('adds a new server button, when I click on the add a server button', () => {
    const fooConfig = new Config(fooConfiguration);

    const wrapper = mount(
      <GlobalContext.Provider value={{ joinBaseRoute: foo, Config: fooConfig }}>
        <BrowserRouter>
          <AddServerButton />
        </BrowserRouter>
      </GlobalContext.Provider>,
    );

    // when I click on the add a server button
    wrapper.find('button').prop('onClick')();

    const { mainNavButtons } = fooConfig.get(['mainNavButtons']);

    const newButtonAdded = mainNavButtons.filter((b) => b.id !== 'foo')[0];
    const testButton = mainNavButtons.filter((b) => b.id === 'foo')[0];

    expect(typeof newButtonAdded).toBe('object');

    // check button properties
    expect(newButtonAdded).toHaveProperty('id');
    expect(newButtonAdded).toHaveProperty('title');
    expect(newButtonAdded).toHaveProperty('imageSrc');
    expect(newButtonAdded).toHaveProperty('channelExtraClassNames');
    expect(newButtonAdded).toHaveProperty('sort');

    // check button value types
    expect(typeof newButtonAdded.id).toBe('string');
    expect(typeof newButtonAdded.title).toBe('string');
    expect(newButtonAdded.title).toMatch(/New Server/);
    expect(typeof newButtonAdded.imageSrc).toBe('string');
    expect(typeof newButtonAdded.channelExtraClassNames).toBe('object');
    expect(typeof newButtonAdded.channelExtraClassNames[0]).toBe('string');
    expect(typeof newButtonAdded.sort).toBe('number');

    // check sort order
    expect(newButtonAdded.sort).toBe(1);
    expect(testButton.sort).toBe(2);
  });
});
