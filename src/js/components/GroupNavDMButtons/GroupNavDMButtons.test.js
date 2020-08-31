import { mount } from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import Config from '../../utilities/Config';
import GroupNavDMButtons from './GroupNavDMButtons';

describe('GroupNavDMButtons', () => {
  const fooConfiguration = {
    paths: {
      mainPath: '',
    },
    groupNavDMButtons: [
      {
        id: 'foo',
      },
    ],
  };

  const foo = () => '';

  let fooConfig;

  beforeEach(() => {
    fooConfig = new Config(fooConfiguration);
  });

  it('displays a “Direct messages” component in the secondary navigation', () => {
    const wrapper = mount(
      <GlobalContext.Provider value={{
        joinRoutePath: foo, safeUpdate: foo, Config: fooConfig, createRandomMessageLog: foo,
      }}
      >
        <MemoryRouter initialEntries={['/channels/foo']} initialIndex={0}>
          <GroupNavDMButtons />
        </MemoryRouter>
      </GlobalContext.Provider>,
    );

    expect(wrapper.find('GroupNavDMButton').exists()).toBeTruthy();
  });

  it('displays an “add” button', () => {
    const wrapper = mount(
      <GlobalContext.Provider value={{
        joinRoutePath: foo, safeUpdate: foo, Config: fooConfig, createRandomMessageLog: foo,
      }}
      >
        <MemoryRouter initialEntries={['/channels/foo']} initialIndex={0}>
          <GroupNavDMButtons />
        </MemoryRouter>
      </GlobalContext.Provider>,
    );

    expect(wrapper.find('.add-group-dm').exists()).toBeTruthy();
  });

  it('adds a new Direct message placeholder button, when I interact with the “add” button', () => {
    const wrapper = mount(
      <GlobalContext.Provider value={{
        joinRoutePath: foo, safeUpdate: foo, Config: fooConfig, createRandomMessageLog: foo,
      }}
      >
        <MemoryRouter initialEntries={['/channels/foo']} initialIndex={0}>
          <GroupNavDMButtons />
        </MemoryRouter>
      </GlobalContext.Provider>,
    );

    wrapper.find('.add-group-dm').prop('onClick')();

    const { groupNavDMButtons } = fooConfig.get(['groupNavDMButtons']);

    const newButtonAdded = groupNavDMButtons.filter((testButton) => testButton.id !== 'foo')[0];

    // check button properties
    expect(newButtonAdded).toHaveProperty('id');
    expect(newButtonAdded).toHaveProperty('name');
    expect(newButtonAdded).toHaveProperty('avatarSrc');
    expect(newButtonAdded).toHaveProperty('members');
    expect(newButtonAdded).toHaveProperty('backgroundColor');

    // check button value types
    expect(typeof newButtonAdded.id).toBe('string');
    expect(typeof newButtonAdded.name).toBe('string');
    expect(newButtonAdded.name).toMatch(/Unnamed/);
    expect(typeof newButtonAdded.avatarSrc).toBe('string');
    expect(typeof newButtonAdded.members).toBe('number');
    expect(typeof newButtonAdded.backgroundColor).toBe('string');
  });

  it('removes the the DM component item, when I interact with the “remove” button', () => {
    const wrapper = mount(
      <GlobalContext.Provider value={{
        joinRoutePath: foo, safeUpdate: foo, Config: fooConfig, createRandomMessageLog: foo,
      }}
      >
        <MemoryRouter initialEntries={['/channels/foo']} initialIndex={0}>
          <GroupNavDMButtons />
        </MemoryRouter>
      </GlobalContext.Provider>,
    );

    wrapper.find('.svg-cross').prop('onClick')();

    const { groupNavDMButtons } = fooConfig.get(['groupNavDMButtons']);

    expect(groupNavDMButtons).toHaveLength(0);
  });
});
