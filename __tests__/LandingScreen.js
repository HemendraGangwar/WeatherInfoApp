import React from 'react';
import LandingScreen from '../src/components/LandingScreen';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

it('renders correctly', () => {
  const wrapper = shallow(<LandingScreen />)
  expect(toJson(wrapper)).toMatchSnapshot();
});

describe('LandingScreen', () => {
  describe('Rendering', () => {
      it('should match to snapshot', () => {
          const component = shallow(<LandingScreen />)
          expect(component).toMatchSnapshot()
      });
  });
});