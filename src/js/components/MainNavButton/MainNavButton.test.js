import React from "react";
import { shallow } from 'enzyme';
import MainNavButton from "./MainNavButton";

const AComponent = (props) => {
  return (
    <div>
      <h1>hi</h1>
    </div>
  )
}

it('has the right class', () => {
  const wrapper = shallow(<AComponent />);
  const text = wrapper.find('div h1');
  expect(text.text()).toBe('hi');
})
