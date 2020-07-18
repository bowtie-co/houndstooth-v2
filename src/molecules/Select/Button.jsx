import React, { Fragment } from 'react';
// import { A } from 'hookrouter';
import {
  // Button,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

export const SelectButton = (props) => {
  const { title = 'Select', options = [], color = 'primary', dir = 'left', caret = true, blank = false, disabled = false } = props;

  // console.debug('SelectButton', { title, options, color, dir, caret, props });

  const optsMap = (options) => options.map(opt => typeof opt === 'string' ? ({ text: opt, href: opt }) : opt);

  return (
    <UncontrolledButtonDropdown disabled={disabled} direction={dir} color={color}>
      <DropdownToggle color={color} caret={caret}>
        {title}
        &nbsp;
      </DropdownToggle>
      <DropdownMenu>
        {optsMap(options).map((opt, index) => (
          <Fragment key={index}>
            <DropdownItem>
              <a target={blank ? '_blank' : ''} href={opt.href}>{opt.text}</a>
            </DropdownItem>
            {index < (options.length - 1) && <DropdownItem divider />}
          </Fragment>
        ))}
      </DropdownMenu>
    </UncontrolledButtonDropdown>
  );
};
