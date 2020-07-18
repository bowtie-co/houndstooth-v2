import React from 'react';
import { Button } from 'reactstrap';

export const AppButton = ({ children, className, ...props }) => {
  // console.debug('AppButton', { props });

  return (
    <Button className={`AppButton ${className || ''}`} {...props}>
      {children}
    </Button>
  );
};
