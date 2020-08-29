import React from "react";
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import { AppButton } from '../atoms/App';

const mockProps = {
  className: 'submit-button',
  children: 'test description'
};

describe("AppButton component", () => {
  let wrapper;
  let appButton;
  const saveChanges = jest.fn(() => 'saveChanges');

  beforeAll(() => {
    wrapper = shallow(
      <AppButton onClick={saveChanges} {...mockProps} />
    );
  });

  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
  });

  it('should have the onClick prop', () => {
    expect(wrapper.prop('onClick')).toEqual(saveChanges);
  });

  it('should call handleSubmit on click', () => {
    wrapper.simulate('click');
    wrapper.update();
    expect(saveChanges).toHaveBeenCalled();
  });
});
