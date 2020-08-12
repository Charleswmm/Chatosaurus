import { mount } from 'enzyme';
import React from 'react';
import MainNavItem from './MainNavItem';

describe('MainNavItem', () => {
  const wrapper = mount(
    <MainNavItem name="foo" icon="bar" />,
  );

  const wrapper2 = mount(
    <MainNavItem name="foo bar" channelExtraClassNames={['foo']} />,
  );

  // The “hover state" is created in css
  // The "button's label" is the `title` prop
  it('gets a tooltip with the button’s label', () => {
    expect(wrapper.find('.tool-tip').text()).toBe('foo');
  });

  it('has an image used as the button', () => {
    expect(wrapper.find('.nav-channel').prop('style')).toHaveProperty('backgroundImage', 'url(bar)');
    expect(wrapper.find('.nav-channel').hasClass('nav-channel-image')).toBeTruthy();
  });

  it('display as a specific colour', () => {
    expect(wrapper2.find('.nav-channel').hasClass('foo')).toBeTruthy();
  });

  it('has a set of initials', () => {
    expect(wrapper2.find('.nav-channel-content').text()).toBe('fb');
  });
});
