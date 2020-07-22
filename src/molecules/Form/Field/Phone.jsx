import React from 'react';
import { Input } from 'reactstrap';
import { FormGroup } from '../';

// TODO: Implement or pull from props (created/passed higher level?)
const formatPhoneNumber = (val) => val;

export const FormFieldPhone = (props) => {
  // console.debug('FormFieldPhone', { props });

  const { value, edited, className = '', ...rest } = props;
  const { asYouType, asYouTypePhoneNumber, formatCurrency, formatExtLink, formatMessageUrl, parsePhoneNumber, setAsYouType, ...sanitizedProps } = rest;

  return (
    <FormGroup className={`${className} ${edited ? 'success-highlight' : ''}`} {...sanitizedProps}>
      <Input value={value ? formatPhoneNumber(value) : ''} {...sanitizedProps} />
    </FormGroup>
  );
};
