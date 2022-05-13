import React from "react";
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import { BranchSelect } from '../molecules';

const mockProps = {
  location: {
    href: 'http://localhost:3000',
    pathname: '/bowtie-co/marketing-site/collections'
  },
  branch: 'git-branch',
  className: 'branch-select',
  e: {
    name: 'master'
  }
};

describe("BranchSelect component", () => {
  let wrapper;
  const handleSelect = jest.fn((e) => 'handleSelect');

  beforeAll(() => {
    wrapper = shallow(
      <BranchSelect {...mockProps} />
    );
  });

  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
  });

  it('should have a className', () => {
    expect(wrapper.prop('className')).toBe('NavSelect branch-select');
  });

  // it('should have the onChange prop', () => {
  //   console.log(wrapper.props());
  //   expect(wrapper.props('onChange')).toBe(handleSelect);
  // });
  //
  // it('should call handleSelect on change', () => {
  //   wrapper.simulate('change');
  //   wrapper.update();
  //   expect(handleSelect).toHaveBeenCalled();
  // });
});
