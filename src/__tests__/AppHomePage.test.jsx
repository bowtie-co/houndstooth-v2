import React from "react";
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import { AppHomePage } from '../pages';

const mockProps = {
  className: 'footer-section'
};

describe("AppHome component", () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <AppHomePage {...mockProps} />
    );
  });

  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
  });
});
