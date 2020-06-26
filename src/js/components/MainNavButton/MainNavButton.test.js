import React from "react";
import { mount } from 'enzyme';
import MainNavButton from "./MainNavButton";
import { GlobalContext } from "../../contexts/GlobalContextWrapper";

describe('MainNavButton', () => {
  const fooValues = {
    state: {
      currentMainNavButtonId: '',
    }
  }

  // The “hover state" is created in css
  // The "button's label" is the `title` prop
  it('gets a tooltip with the button’s label', () => {
    const wrapper = mount(
      <GlobalContext.Provider value={ fooValues } >
        <MainNavButton title={ 'foo' } />
      </GlobalContext.Provider>
    );

    expect(wrapper.find('.tool-tip').text()).toBe('foo');
  });

  it('displays an active state', () => {
    const barValues = {
      state: {
        currentMainNavButtonId: 'foo',
      }
    }

    const wrapper = mount(
      <GlobalContext.Provider value={ barValues } >
        <MainNavButton id={ 'foo' } />
      </GlobalContext.Provider>
    );

    expect(wrapper.find('.nav-channel').hasClass('nav-channel-active')).toBeTruthy();
  });

  it('has an image used as the button', () => {
    const wrapper = mount(
      <GlobalContext.Provider value={ fooValues } >
        <MainNavButton imageSrc={ 'foo' } />
      </GlobalContext.Provider>
    );

    expect(wrapper.find('.nav-channel').prop('style')).toHaveProperty('backgroundImage', "url(foo)")
    expect(wrapper.find('.nav-channel').hasClass('nav-channel-image')).toBeTruthy();
  });

  it('has a set of initials', () => {
    const wrapper = mount(
      <GlobalContext.Provider value={ fooValues } >
        <MainNavButton title={'foo bar'} />
      </GlobalContext.Provider>
    );

    expect(wrapper.find('.nav-channel-content').text()).toBe('fb');
  });

  it('display as a specific colour', () => {
    const wrapper = mount(
      <GlobalContext.Provider value={ fooValues } >
        <MainNavButton channelExtraClassNames={['foo']} />
      </GlobalContext.Provider>
    );

    expect(wrapper.find('.nav-channel').hasClass('foo')).toBeTruthy();
  });
});
