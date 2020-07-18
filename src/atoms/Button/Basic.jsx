import React from 'react';
import { Button } from 'reactstrap';

export const ButtonBasic = ({ children, className, ...props }) => {
  // console.debug('ButtonBasic', { props });

  return (
    <Button className={`ButtonBasic ${className || ''}`} {...props}>
      {children}
    </Button>
  );
};
