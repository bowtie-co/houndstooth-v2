import React, { Fragment } from 'react';
import classnames from 'classnames';
import { Nav, NavLink } from 'reactstrap';
import { AppIcon } from '../../atoms';
import { CollectionNav } from '../../molecules';

export const AppSidebar = ({ children, className, isCollapsed, toggleIsCollapsed, ...props }) => {
  const { repo, jekyll, translate } = props;

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
              <span>{translate('sidebar.repos')}</span>
            </NavLink>

            {repo && repo.permissions.admin && (
              <Fragment>
                <NavLink href={`/${repo.full_name}/users`}>
                  <AppIcon iconName={'user'} />
                  <span>{translate('sidebar.users')}</span>
                </NavLink>
                <NavLink href={`/${repo.full_name}/pulls`}>
                  <AppIcon iconName={'object-ungroup'} />
                  <span>{translate('sidebar.changes')}</span>
                </NavLink>
              </Fragment>
            )}
          </Nav>
          {repo && jekyll && jekyll.collections && (
            <Nav vertical>
              <NavLink href={`/${repo.full_name}/collections`}>
                <AppIcon iconName={'folder'} />
                <span>{translate('sidebar.collections')}</span>
                <CollectionNav {...props} />
              </NavLink>
            </Nav>
          )}
        </div>
      </div>
    </section>
  );
};
