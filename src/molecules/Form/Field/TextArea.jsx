import React from 'react';
import { Input } from 'reactstrap';
import { FormGroup } from '../';

export const FormFieldTextArea = (props) => {
  const { value, edited, className = '', clearable, ...rest } = props;
  const { onChange } = rest;

  return (
    <FormGroup className={`${className} ${edited ? 'success-highlight' : ''}`} {...rest}>
      <Input rows='5' type='textarea' value={value || ''} clearable={clearable.toString()} onChange={onChange} />
    </FormGroup>
  );
};
