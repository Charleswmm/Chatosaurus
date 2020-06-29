import React from "react";
import { mount } from 'enzyme';
import MainNavItem from "../MainNavItem/MainNavItem";

describe('MainNavItem', () => {

  // The “hover state" is created in css
  // The "button's label" is the `title` prop
  it('gets a tooltip with the button’s label', () => {
    const wrapper = mount(
      <MainNavItem title={ 'foo' } />
    );

    expect(wrapper.find('.tool-tip').text()).toBe('foo');
  });

  it('has an image used as the button', () => {
    const wrapper = mount(
      <MainNavItem imageSrc={ 'foo' } />
    );

    expect(wrapper.find('.nav-channel').prop('style')).toHaveProperty('backgroundImage', "url(foo)")
    expect(wrapper.find('.nav-channel').hasClass('nav-channel-image')).toBeTruthy();
  });

  it('has a set of initials', () => {
    const wrapper = mount(
      <MainNavItem title={'foo bar'} />
    );

    expect(wrapper.find('.nav-channel-content').text()).toBe('fb');
  });

  it('display as a specific colour', () => {
    const wrapper = mount(
      <MainNavItem channelExtraClassNames={['foo']} />
    );

    expect(wrapper.find('.nav-channel').hasClass('foo')).toBeTruthy();
  });
});
