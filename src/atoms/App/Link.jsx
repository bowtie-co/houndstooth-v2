import React, { Fragment } from 'react';
import { AppButton, AppIcon } from '.';

export const AppLink = ({ children, className, button = false, iconLeft, iconRight, ...props }) => {
  // console.debug('AppLink', { props });

  if (props.target === '_blank') {
    props.rel = 'noopener noreferrer';
  }

  return (
    <a className={`AppLink ${className || ''}`} {...props}>
      {button ? (
        <AppButton {...props}>
          {iconLeft && <AppIcon iconName={iconLeft} />}
          {children}
          {iconRight && <AppIcon iconName={iconRight} />}
        </AppButton>
      ) : (
        <Fragment>
          {iconLeft && <AppIcon iconName={iconLeft} />}
          {children}
          {iconRight && <AppIcon iconName={iconRight} />}
        </Fragment>
      )}
    </a>
  );
};
