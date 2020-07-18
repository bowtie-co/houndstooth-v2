import React from 'react';
import classnames from 'classnames';
import { Nav, NavLink } from 'reactstrap';
import { AppIcon } from '../../atoms';

export const AppSidebar = ({ children, className, isCollapsed, toggleIsCollapsed, ...props }) => {
  const { translate } = props;

  return (
    <section className={classnames(`AppSidebar side-menu-section ${className || ''}`, {'collapsed-side-menu': isCollapsed})}>
      <div className={classnames({ collapsedWrapper: isCollapsed }, 'collapse-horizontal')}>
        <div className='collapsable-arrow pointer' onClick={toggleIsCollapsed}>
          <AppIcon iconName={`${isCollapsed ? 'angle-right' : 'angle-left'}`} size='md' />
        </div>
        <div className={classnames({ isCollapsed })}>
          <Nav vertical>
            <NavLink href='/'>
              <AppIcon iconName={'list'} />
              <span>{translate('sidebar.users')}</span>
            </NavLink>
          </Nav>
        </div>
      </div>
    </section>
  );
};
