import React from 'react';
import { Input } from 'reactstrap';
import { FormGroup } from '../';

export const FormFieldTextArea = (props) => {
  const { value, edited, className = '', ...rest } = props;
  return (
    <FormGroup className={`${className} ${edited ? 'success-highlight' : ''}`} {...rest}>
      <Input rows='5' type='textarea' value={value || ''} {...rest} />
    </FormGroup>
  );
};
