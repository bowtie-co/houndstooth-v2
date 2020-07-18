import React, { useState } from 'react';
import { Tooltip } from 'reactstrap';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export const AppIcon = ({ className, size = 'xs', fill = true, iconName, color, id, title, tooltip, ...rest }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const target = 'AppIcon-' + parseInt(Math.random() * Date.now() / Math.random());
  const faClass = className || `fa${fill ? 's' : 'r'} fa-${iconName}`;
  const sizes = {
    xs: '',
    sm: 'lg',
    md: '2x',
    l: '3x',
    xl: '4x',
    xxl: '5x'
  };

  return (
    <div className={classnames({ 'cursor-pointer': rest['onClick'] || tooltip }, 'fa-icon-sm')} {...rest}>
      <i className={`${faClass} fa-${sizes[size]}`} style={{ 'color': color }} id={target} title={title} />
      {
        tooltip &&
        <Tooltip
          autohide
          delay={{ show: 450, hide: 0 }}
          placement={'bottom'}
          {...{ target, isOpen, toggle}}>
          {tooltip}
        </Tooltip>
      }
    </div>
  );
};

AppIcon.propTypes = {
  fill: PropTypes.bool,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'l', 'xl', 'xxl']),
  iconName: PropTypes.string,
  className: PropTypes.string
};
