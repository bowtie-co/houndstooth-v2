import React from "react";
import { shallow, mount, configure } from 'enzyme';
import moment from 'moment';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import { AppFooter } from '../organisms';
import { BowtieLogo } from '../atoms';
import { AppIcon } from '../atoms/App';

const mockProps = {
  children: 'test children'
};

describe("AppFooter component", () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <AppFooter {...mockProps} />
    );
  });

  it('renders without crashing', () => {
    expect(wrapper).toBeDefined();
  });

  it('should render BowtieLogo', () => {
    expect(wrapper.contains(<BowtieLogo />)).toBeTruthy();
  });

  it('should render AppIcon', () => {
    expect(wrapper.contains(<AppIcon iconName='copyright' fill={false} />)).toBeTruthy();
  });

  it('should render text', () => {
    expect(wrapper.text()).toEqual(`<BowtieLogo />Copyright Bowtie <AppIcon />${moment().year()}`);
  });
});
