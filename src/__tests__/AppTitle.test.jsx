import React from "react";
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import { AppTitle } from '../atoms/App';

const mockProps = {
  className: 'test-title',
  children: 'test children'
};

describe("Apptitle component", () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <AppTitle {...mockProps} />
    );
  });

  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
  });

  it('should have a className', () => {
    expect(wrapper.prop('className')).toBe('title break-word test-title');
  });
});
