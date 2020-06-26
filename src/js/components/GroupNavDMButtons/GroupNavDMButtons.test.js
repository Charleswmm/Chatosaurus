import React from "react";
import { mount } from 'enzyme';
import GroupNavDMButtons from "./GroupNavDMButtons";
import Config from "../../utilities/Config";
import { GlobalContext } from "../../contexts/GlobalContextWrapper";

describe('GroupNavDMButtons', () => {
  const fooConfiguration = {
    groupNavDMButtons: [
      {
        id: 'foo'
      },
    ]
  };

  const fooValues = {
    state: {
      currentGroupNavDMButtonId: '',
    }
  }

  let fooConfig;

  beforeEach(() => {
    fooConfig = new Config(fooConfiguration)
  })

  it('displays a “Direct messages” component in the secondary navigation', () => {
    const wrapper = mount(
      <GlobalContext.Provider value={{ ...fooValues, Config: fooConfig,}}>
        <GroupNavDMButtons />
      </GlobalContext.Provider>
    );

    expect(wrapper.find('GroupNavDMButton').exists()).toBeTruthy()
  });

  it('displays an “add” button', () => {
    const wrapper = mount(
      <GlobalContext.Provider value={{ ...fooValues, Config: fooConfig,}}>
        <GroupNavDMButtons />
      </GlobalContext.Provider>
    );

    expect(wrapper.find('.svg-plus').hasClass('add-group-dm')).toBeTruthy();
  });

  it('adds a new Direct message placeholder button, when I interact with the “add” button', () => {
    const bar = () => '';

    const wrapper = mount(
      <GlobalContext.Provider value={{ ...fooValues, Config: fooConfig, setCurrentGroupNavDMButtonId: bar }}>
        <GroupNavDMButtons />
      </GlobalContext.Provider>
    );

    wrapper.find('.add-group-dm').prop('onClick')();

    const { groupNavDMButtons } = fooConfig.get(['groupNavDMButtons'])

    const newButtonAdded = groupNavDMButtons.filter((testButton) => testButton.id !==  'foo')[0];

    // check button properties
    expect(newButtonAdded).toHaveProperty('id');
    expect(newButtonAdded).toHaveProperty('title');
    expect(newButtonAdded).toHaveProperty('avatarSrc');
    expect(newButtonAdded).toHaveProperty('members');
    expect(newButtonAdded).toHaveProperty('backgroundColor');

    // check button value types
    expect(typeof newButtonAdded.id).toBe('string');
    expect(typeof newButtonAdded.title).toBe('string');
    expect(newButtonAdded.title).toMatch(/Server/);
    expect(typeof newButtonAdded.avatarSrc).toBe('string');
    expect(typeof newButtonAdded.members).toBe('number');
    expect(typeof newButtonAdded.backgroundColor).toBe('string');
  });

  it('removes the the DM component item, when I interact with the “remove” button', () => {
    const bar = () => '';

    const wrapper = mount(
      <GlobalContext.Provider value={{ ...fooValues, Config: fooConfig, setCurrentGroupNavDMButtonId: bar }}>
        <GroupNavDMButtons />
      </GlobalContext.Provider>
    );

    wrapper.find('.svg-cross').prop('onClick')();

    const { groupNavDMButtons } = fooConfig.get(['groupNavDMButtons'])

    expect(groupNavDMButtons).toHaveLength(0)
  });
});
