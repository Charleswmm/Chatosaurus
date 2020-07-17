import { mount } from 'enzyme';
import React from 'react';
import { GlobalContext } from '../../contexts/GlobalContextWrapper';
import Config from '../../utilities/Config';
import ChatLogItem from './ChatLogItem';

describe('ChatLogItem', () => {
  const fooConfiguration = {
    iconButtons: [
      {
        type: 'reaction',
        toolTipText: 'Add Reaction',
      },
      {
        type: 'more',
        toolTipText: 'More',
      },
      {
        type: 'edit',
        toolTipText: 'Edit',
      }],
  };

  const fooConfig = new Config(fooConfiguration);

  const wrapper = mount(
    <GlobalContext.Provider value={{ Config: fooConfig }}>
      <ChatLogItem />
    </GlobalContext.Provider>,
  );

  it('log item action menu contains reaction edit and more', () => {
    expect(wrapper.find('ChatLogItemActions').exists()).toBeTruthy();
    expect(wrapper.find('.svg-reaction').exists()).toBeTruthy();
    expect(wrapper.find('.svg-edit').exists()).toBeTruthy();
    expect(wrapper.find('.svg-more').exists()).toBeTruthy();

    const actionToolTips = wrapper.find('.tool-tip-text').map((e) => e.text());
    actionToolTips.shift();

    expect(actionToolTips).toEqual(['Add Reaction', 'Edit', 'More']);
  });
});
