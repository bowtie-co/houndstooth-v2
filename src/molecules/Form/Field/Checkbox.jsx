import React from 'react';
import { Input } from 'reactstrap';
import { FormGroup } from '../';

export const FormFieldCheckbox = (props) => {
  const { onChange, cleanObjectsFromDom, ...inputProps } = props;
  const { edited, name, className = '', value, ...rest } = props;
  // const sanitizedProps = cleanObjectsFromDom(inputProps);

  const handleChange = (e) => {
    onChange({ target: { name, value: !!e.target.checked } });
  };

  return (
    <FormGroup className={`marLeft ${className} ${edited ? 'success-highlight' : ''}`} check {...rest}>
      <Input type='checkbox' onChange={handleChange} checked={value} {...inputProps} />
    </FormGroup>
  );
};
