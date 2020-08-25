import React from 'react';
import { Button } from 'reactstrap';

export const AppButton = (props) => {
  const { children, className, uploaderOptions, uploadedFiles, s3Url, ...rest } = props;
  // console.debug('AppButton', { props });

  return (
    <Button className={`AppButton ${className || ''}`} {...rest}>
      {children}
    </Button>
  );
};
