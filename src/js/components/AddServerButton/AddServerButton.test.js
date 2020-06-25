import React from "react";
import { mount } from 'enzyme';
import AddServerButton from "./AddServerButton";
import { GlobalContext } from "../../contexts/GlobalContextWrapper";
import Config from "../../utilities/Config";

// it adds a new server button, when I click on the add a server button

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

  it('adds a new server button, when I click on the add a server button', () => {
    const foo = new Config(fooConfiguration)

    const values = {
      state: {
        currentMainNavButtonId: '',
      }
    }
    const bar = () => '';

    const wrapper = mount(
      <GlobalContext.Provider value={{ ...values, Config: foo, setCurrentMainNavButtonId: bar }} >
        <AddServerButton />
      </GlobalContext.Provider>
    );

    // when I click on the add a server button
    wrapper.find('button').simulate('click')

    const newButtonAdded = foo._data.mainNavButtons.filter((testButton) => testButton.id !==  'foo');
    const testButton = foo._data.mainNavButtons.filter((testButton) => testButton.id ===  'foo');

    expect(typeof newButtonAdded[0]).toBe('object');

    // check button properties
    expect(newButtonAdded[0]).toHaveProperty('id');
    expect(newButtonAdded[0]).toHaveProperty('title');
    expect(newButtonAdded[0]).toHaveProperty('imageSrc');
    expect(newButtonAdded[0]).toHaveProperty('channelExtraClassNames');
    expect(newButtonAdded[0]).toHaveProperty('sort');

    // check button value types
    expect(typeof newButtonAdded[0].id).toBe('string');
    expect(typeof newButtonAdded[0].title).toBe('string');
    expect(newButtonAdded[0].title).toMatch(/New Server/);
    expect(typeof newButtonAdded[0].imageSrc).toBe('string');
    expect(typeof newButtonAdded[0].channelExtraClassNames).toBe('object');
    expect(typeof newButtonAdded[0].channelExtraClassNames[0]).toBe('string');
    expect(typeof newButtonAdded[0].sort).toBe('number');

    // check sort order
    expect(newButtonAdded[0].sort).toBe(1);
    expect(testButton[0].sort).toBe(2);
  });
});