import 'react-native';
import React from 'react';
import App from '../App'; 
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

it('renders correctly', () => {
  const wrapper = shallow(<App />)
  expect(toJson(wrapper)).toMatchSnapshot();
});
