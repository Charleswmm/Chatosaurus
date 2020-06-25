import React from "react";
import { mount } from 'enzyme';
import MainNavButton from "./MainNavButton";
import { GlobalContext } from "../../contexts/GlobalContextWrapper";

// it gets a tooltip with the button’s label
// it displays an active state
// it has an image used as the button
// it has a set of initials
// it display as a specific colour (e.g theme green, or theme blue)

describe('MainNavButton', () => {

  // The “hover state" is created in css
  // The "button's label" is the `title` prop
  it("gets a tooltip with the button’s label", () => {
    const values = {
      state: {
        currentMainNavButtonId: '',
      }
    }
    const wrapper = mount(
      <GlobalContext.Provider value={ values } >
        <MainNavButton title={ 'foo' } />
      </GlobalContext.Provider>
    );
    expect(wrapper.find('.tool-tip').text()).toBe('foo');
  })

  it('displays an active state', () => {
    const values = {
      state: {
        currentMainNavButtonId: 'foo',
      }
    }

    const wrapper = mount(
      <GlobalContext.Provider value={ values } >
        <MainNavButton id={ 'foo' } />
      </GlobalContext.Provider>
    );

    expect(wrapper.find('.nav-channel').hasClass('nav-channel-active')).toBeTruthy();
  })

  it('has an image used as the button', () => {
    const values = {
      state: {
        currentMainNavButtonId: '',
      }
    }

    const wrapper = mount(
      <GlobalContext.Provider value={ values } >
        <MainNavButton imageSrc={ 'foo' } />
      </GlobalContext.Provider>
    );

    expect(wrapper.find('.nav-channel').prop('style')).toHaveProperty('backgroundImage', "url(foo)")
    expect(wrapper.find('.nav-channel').hasClass('nav-channel-image')).toBeTruthy();
  })

  it('has a set of initials', () => {
    const values = {
      state: {
        currentMainNavButtonId: '',
      }
    }

    const wrapper = mount(
      <GlobalContext.Provider value={ values } >
        <MainNavButton title={'foo bar'} />
      </GlobalContext.Provider>
    );

    expect(wrapper.find('.nav-channel-content').text()).toBe('fb');
  })

  it('display as a specific colour', () => {
    const values = {
      state: {
        currentMainNavButtonId: '',
      }
    }

    const wrapper = mount(
      <GlobalContext.Provider value={ values } >
        <MainNavButton channelExtraClassNames={['foo']} />
      </GlobalContext.Provider>
    );

    expect(wrapper.find('.nav-channel').hasClass('foo')).toBeTruthy();
  })
})
