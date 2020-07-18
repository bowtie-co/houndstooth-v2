import React, { Fragment, useState } from 'react';
import {
  WithChildren,
  WithContent
} from '.';
import {
  AppSidebar,
  AppNavbar,
  AppAlert,
  AppFooter
} from '../../organisms';

export const WithSidebar = ({ children, className, ...props }) => {
  const [ isCollapsed, setIsCollapsed ] = useState(false);
  const toggleIsCollapsed = () => setIsCollapsed(!isCollapsed);

  return (
    <Fragment>
      <section className='app'>
        <AppNavbar {...props} />

        <section className={`WithSidebar content-wrapper ${className || ''}`}>
          <AppSidebar {...props} {...{ isCollapsed, toggleIsCollapsed }} />

          <WithContent {...props}>
            <AppAlert {...props} />
            <WithChildren children={children} {...props}  />
          </WithContent>
        </section>

        <AppFooter {...props} />
      </section>
    </Fragment>
  );
};
